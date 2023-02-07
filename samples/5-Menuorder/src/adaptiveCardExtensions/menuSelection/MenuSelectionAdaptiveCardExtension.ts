import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickViewSuccess } from './quickView/QuickViewSuccess';
import { QuickViewSelected } from './quickView/QuickViewSelected';
import { MenuSelectionPropertyPane } from './MenuSelectionPropertyPane';
import { QuickViewMenu } from './quickView/QuickViewMenu';
import axios from 'axios';
import { QuickViewError } from './quickView/QuickViewError';

// Starting the app...
export interface IMenuSelectionAdaptiveCardExtensionProps {
  title: string;
  iconProperty: string
}
export interface IMenu {
  title: string
  description: string,
  imgUrl?: string,
}
export interface ISelectedFood {
  selectedMenu: string
  comment: string
}
export interface IMenuSelectionAdaptiveCardExtensionState {
  hasSelection: boolean,
  title: string,
  question: string
  selectedFood?: ISelectedFood,
  menu: IMenu[],
  submitted: boolean,
  user: string,
  weekday: string
}

/* We difine here card and quickview Components */
const CARD_VIEW_REGISTRY_ID: string = 'MenuSelection_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'MenuSelection_QUICK_VIEW';
export const SELECTED_VIEW_REGISTRY_ID: string = 'MenuSelection_selected_VIEW';
export const SUCCESS_VIEW_REGISTRY_ID: string = 'MenuSelection_success_VIEW';
export const ERROR_VIEW_REGISTRY_ID: string = 'MenuSelection_error_VIEW';

export default class MenuSelectionAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMenuSelectionAdaptiveCardExtensionProps,
  IMenuSelectionAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MenuSelectionPropertyPane | undefined;

  public onInit = async (): Promise<void> => {
    console.log("I am running... ;)")
    /* 
     * We define our main state here
     */
    this.state = {
      user: this.context.pageContext.user.email,
      hasSelection: false,
      title: "Today's menu",
      question: "what´s your choice?",
      submitted: false,
      selectedFood: null,
      menu: [],
      weekday: this.getWeekDay()
    };

    /* 
    * getLunchMenu url
     */
    const url = "<!-- DEPLOY GETLUNCHMENU.jSON - ADD THE API ENDPOINT THAT RETURNS THE DATA TO SHOW -->"

    /* 
     * We initiate the logic app getLunchMenu
     * There are 2 scenarios:
     * - in case the user has no choice for the day the menu will have 3 items and will be saved in the state.menu
     * - in case the user has choice it sends 1 item in the menu array and will be saved in the selectedFood and the has selection will be true
     ! in both cases the weekday will be sent now from the logicapp but in production would be sent from the clientapp to the logicapp
     */

    const params = {
      user: this.state.user,
      weekday: this.state.weekday
    }
    const resp = await axios.post(url, params)
    const data = resp.data
    data.menu.length > 1 ? this.setState({ menu: data.menu, weekday: data.weekday }) : this.setState({ selectedFood: data.menu[0], weekday: data.weekday, hasSelection: true })


    /* 
    * We register here the upper defined Components and initialize them. 
    * They have to be already created and imported here to be able to do them
    */
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(SELECTED_VIEW_REGISTRY_ID, () => new QuickViewSelected())
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickViewMenu())
    this.quickViewNavigator.register(SUCCESS_VIEW_REGISTRY_ID, () => new QuickViewSuccess())
    this.quickViewNavigator.register(ERROR_VIEW_REGISTRY_ID, () => new QuickViewError())


    return Promise.resolve();
  }


  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      './MenuSelectionPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MenuSelectionPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }

  protected getWeekDay = (): string => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = new Date().getDay()
    console.log(weekdays[day])
    return weekdays[day]
  }
}

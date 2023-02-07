import { ISPFxAdaptiveCard, BaseAdaptiveCardView, ISubmitActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import axios from 'axios';
import { ERROR_VIEW_REGISTRY_ID, IMenu, IMenuSelectionAdaptiveCardExtensionProps, IMenuSelectionAdaptiveCardExtensionState, SUCCESS_VIEW_REGISTRY_ID } from '../MenuSelectionAdaptiveCardExtension';

export interface IQuickViewMenuData {
  title: string,
  question: string,
  menu: IMenu[];
}


export class QuickViewMenu extends BaseAdaptiveCardView<
  IMenuSelectionAdaptiveCardExtensionProps,
  IMenuSelectionAdaptiveCardExtensionState,
  IQuickViewMenuData
> {

  public get data(): IQuickViewMenuData {
    const state: IQuickViewMenuData = {
      title: this.state.title,
      question: this.state.question,
      menu: this.state.menu
    }
    return state
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewMenuTemplate.json');
  }

  /* 
   * This function will simple return a boolean to indicate success or failure to show the error or the success quickview
   */
  public submit = async (url: string, params: ISubmitData) => {
    const response = await axios.post(url, params)
    return response.status === 200 ? true : false
  }

  /* 
  * Submit event handler
   */
  public onAction = (action: ISubmitActionArguments): void => {

    const submitUrl = "<!-- DEPLOY POSTLUNCHMENU.jSON - ADD THE API ENDPOINT THAT RETURNS THE DATA TO SHOW -->"

    let comment = "No special wishes were requested."

    /* 
    * Extract the comments from the event that we can have a simple comment param in the submit event
    */
    Object.entries(action.data).forEach(([key, value], index) => {
      if (index === 1 && typeof (value) === 'string' && value.length > 0) {
        comment = value
      }
    })

    const params: ISubmitData = {
      email: this.context.pageContext.user.email,
      choice: action.data.choice,
      comment: comment,
      weekday: this.state.weekday
    }

    if (action.type === 'Submit') {
      const success = this.submit(submitUrl, params)
      if (!success) {
        return this.quickViewNavigator.replace(ERROR_VIEW_REGISTRY_ID)
      }
      this.setState({
        selectedFood: {
          selectedMenu: params.choice,
          comment: params.comment
        }, hasSelection: true
      })
      this.quickViewNavigator.replace(SUCCESS_VIEW_REGISTRY_ID)
    }

  }
}

export interface ISubmitData {
  email: string,
  choice: string,
  comment: string,
  weekday: string
}
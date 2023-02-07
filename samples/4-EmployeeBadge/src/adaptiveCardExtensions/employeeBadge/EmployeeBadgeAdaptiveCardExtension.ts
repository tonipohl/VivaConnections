import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { EmployeeBadgePropertyPane } from './EmployeeBadgePropertyPane';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IEmployeeBadgeAdaptiveCardExtensionProps {
  title: string;
}

export interface IEmployeeBadgeAdaptiveCardExtensionState {
  user: any;
  code: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'EmployeeBadge_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'EmployeeBadge_QUICK_VIEW';

export default class EmployeeBadgeAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IEmployeeBadgeAdaptiveCardExtensionProps,
  IEmployeeBadgeAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: EmployeeBadgePropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      user: {},
      code: require("./assets/barcode.png")
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    this.getUserData();

    return Promise.resolve();
  }

  private getUserData() {

    this.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
      client.api("/me").get((error, user: any) => {
        console.log(user);
        this.setState({ user: user, code: "https://m365search.blob.core.windows.net/images/barcode.png" });
      });
    });
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'EmployeeBadge-property-pane'*/
      './EmployeeBadgePropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.EmployeeBadgePropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}

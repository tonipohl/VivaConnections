import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { EmployeeBadgePropertyPane } from './EmployeeBadgePropertyPane';
// This sample is using Microsoft Graph to read additional user properties
// https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph
import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IEmployeeBadgeAdaptiveCardExtensionProps {
  title: string;
}

export interface IEmployeeBadgeAdaptiveCardExtensionState {
  user: any,
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

    this.context.msGraphClientFactory
      .getClient('3')
      .then((client: MSGraphClientV3): void => {
        // get information about the current user from the Microsoft Graph
        client
          .api('/me')
          .get((error: any, user: any, rawResponse?: any) => {
            // handle the response
            console.log("user object: " + user.userPrincipalName + ", " + user.displayName);
            console.log("error: " + error);
            if (user) {
              console.log("setState:");
              this.setState({
                user: user
                // generate a barcode image for the user id here:
                // code: "https://<some-storage>.blob.core.windows.net/images/barcode.png"                 
              })
              console.log("Graph user: " + user.userPrincipalName);
            }
          });
      });

    if (this.state.user) {
      console.log("user: " + this.state.user.userPrincipalName + ", " + this.state.user.displayName);
    }
    else {
      console.log("no data!");
    } 

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
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
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}

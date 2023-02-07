import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'EmployeeBadgeAdaptiveCardExtensionStrings';
import { IEmployeeBadgeAdaptiveCardExtensionProps, IEmployeeBadgeAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../EmployeeBadgeAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IEmployeeBadgeAdaptiveCardExtensionProps, IEmployeeBadgeAdaptiveCardExtensionState> {
  /**
   * Buttons will not be visible if card size is 'Medium' with Image Card View.
   * It will support up to two buttons for 'Large' card size.
   */
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      }
    ];
  }

  public get data(): IImageCardParameters {
    // Want the user profile picin the card here?
    // imageUrl: "/_layouts/15/userphoto.aspx?size=L&username=" + this.state.user.userPrincipalName
    if (this.state.user.displayName != "") {
      return {
        title: this.state.user.displayName,
        primaryText: this.state.user.jobTitle,
        imageUrl: require("../assets/id_badge.png")
      };
    }
    else {
      return {
        title: this.properties.title,
        primaryText: strings.PrimaryText,
        imageUrl: require("../assets/id_badge.png")
      };
    }
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    // We open the badge here
    return {
      type: 'QuickView',
      parameters: {
        view: QUICK_VIEW_REGISTRY_ID
      }
    };
  }
}

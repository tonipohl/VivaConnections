import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  CardSize
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MenuSelectionAdaptiveCardExtensionStrings';
import { IMenuSelectionAdaptiveCardExtensionProps, IMenuSelectionAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID, SELECTED_VIEW_REGISTRY_ID } from '../MenuSelectionAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMenuSelectionAdaptiveCardExtensionProps, IMenuSelectionAdaptiveCardExtensionState> {
  /*
   * Buttons will not be visible if card size is 'Medium' with Image Card View.
   * It will support up to two buttons for 'Large' card size.
   * cardButtons is an array of the available buttons on the widget 
   * in our case our button is only to open the quickview and has two scenarios:
   * - if the hasSelection is true the app shows the SelectedComponent to the user
   * - else the menu selection quickview will be shown
   */

  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: this.state.hasSelection ? SELECTED_VIEW_REGISTRY_ID : QUICK_VIEW_REGISTRY_ID,
          }
        }
      }
    ];
  }
  /* 
   * available card sizes Medium' | 'Large'
   */
  public get cardSize(): CardSize {
    return "Large"
  }
  public get data(): IImageCardParameters {
    return {
      primaryText: strings.PrimaryText,
      imageUrl: require('../assets/markus-spiske-_GM0Zvw3PzY-unsplash.jpg'),
      iconProperty: require('../assets/utensils-solid.svg'),
      title: this.properties.title
    };
  }

  /* 
   * the same logic as on the button onclick the widget itself
   */
  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: this.state.hasSelection ? SELECTED_VIEW_REGISTRY_ID : QUICK_VIEW_REGISTRY_ID,
      }
    };
  }
}

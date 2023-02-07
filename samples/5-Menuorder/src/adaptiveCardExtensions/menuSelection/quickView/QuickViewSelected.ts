import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import { IMenuSelectionAdaptiveCardExtensionProps, IMenuSelectionAdaptiveCardExtensionState } from '../MenuSelectionAdaptiveCardExtension';
import { ISelectedFood } from './../MenuSelectionAdaptiveCardExtension';

export interface IQuickViewSelectedData {
  title: string,
  description: string,
  selectedFood: ISelectedFood;
}

export class QuickViewSelected extends BaseAdaptiveCardView<
  IMenuSelectionAdaptiveCardExtensionProps,
  IMenuSelectionAdaptiveCardExtensionState,
  IQuickViewSelectedData
> {

  public get data(): IQuickViewSelectedData {
    const state: IQuickViewSelectedData = {
      title: this.state.title,
      description: `You have already ordered for ${this.state.weekday}`,
      selectedFood: this.state.selectedFood
    }
    console.log(state)
    return state
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewSelectedTemplate.json');
  }


}
import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import {  IMenuSelectionAdaptiveCardExtensionProps, IMenuSelectionAdaptiveCardExtensionState } from '../MenuSelectionAdaptiveCardExtension';
import { ISelectedFood } from './../MenuSelectionAdaptiveCardExtension';

export interface IQuickViewSuccessData {
  title: string,
  description: string,
  order: ISelectedFood
}


export class QuickViewSuccess extends BaseAdaptiveCardView<
  IMenuSelectionAdaptiveCardExtensionProps,
  IMenuSelectionAdaptiveCardExtensionState,
  IQuickViewSuccessData
> {
   
  public get data(): IQuickViewSuccessData {
  const state:IQuickViewSuccessData = {      
      title: "Thank You very much!",
      description: "Your order has been placed and will be prepared as soon as possible.",
      order: this.state.selectedFood
    }
    return state
  }
  
  public get template(): ISPFxAdaptiveCard { 
    return require('./template/QuickViewSuccessTemplate.json');
  }
  

}
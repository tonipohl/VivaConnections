import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import {  IMenuSelectionAdaptiveCardExtensionProps, IMenuSelectionAdaptiveCardExtensionState } from '../MenuSelectionAdaptiveCardExtension';

export interface IQuickViewErrorData {
  title: string,
  description: string,
}


export class QuickViewError extends BaseAdaptiveCardView<
  IMenuSelectionAdaptiveCardExtensionProps,
  IMenuSelectionAdaptiveCardExtensionState,
  IQuickViewErrorData
> {
   
  public get data(): IQuickViewErrorData {
  const state:IQuickViewErrorData = {      
      title: "Something went wrong. Please try again!",
      description: "Your order could not be completed",
    }
    return state
  }
  
  public get template(): ISPFxAdaptiveCard { 
    return require('./template/QuickViewErrorTemplate.json');
  }
  

}
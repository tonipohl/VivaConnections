import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'EmployeeBadgeAdaptiveCardExtensionStrings';
import { IEmployeeBadgeAdaptiveCardExtensionProps, IEmployeeBadgeAdaptiveCardExtensionState } from '../EmployeeBadgeAdaptiveCardExtension';

export interface IQuickViewData {
  user: any;
  code: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IEmployeeBadgeAdaptiveCardExtensionProps,
  IEmployeeBadgeAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      user: this.state.user,
      code: this.state.code
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}
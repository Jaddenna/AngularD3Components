import { ScaleType } from '../enums/scale-type';

export interface ChartScale {
  key: string;
  constructor: any;
  range: any;
  domain: any;
}

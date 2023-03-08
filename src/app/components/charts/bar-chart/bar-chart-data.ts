export interface BarChartData<xType, yType>
  extends Array<{ x: xType; y: yType }> {
  padding?: number;
  fillColor?: string | string[];
  strokeColor?: string;
}

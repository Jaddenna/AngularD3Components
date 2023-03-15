import * as d3 from 'd3';

export interface PieChartData extends Array<PieChartDatum> {}

export interface PieChartDatum {
  key: string;
  value: number;
  fillColor?: string;
}

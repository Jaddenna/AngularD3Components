import * as d3 from 'd3';
import { PieChartData } from '../components/charts/pie-chart/pie-chart-data';

export class RandomData {
  public static generateRandomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static generateRandomLineData(
    count: [number, number] = [5, 30],
    range: [number, number] = [0, 30]
  ) {
    return d3
      .range(this.generateRandomIntegerInRange(count[0], count[1]))
      .map((n) => this.generateRandomIntegerInRange(range[0], range[1]))
      .map((d, i) => {
        return { x: `data${i}`, y: d };
      });
  }

  public static generateRandomPieData(
    count: [number, number] = [5, 30],
    range: [number, number] = [0, 30]
  ): PieChartData {
    return d3
      .range(this.generateRandomIntegerInRange(count[0], count[1]))
      .map((n) => this.generateRandomIntegerInRange(range[0], range[1]))
      .map((d, i) => {
        return { key: `data${i}`, value: d };
      });
  }
}

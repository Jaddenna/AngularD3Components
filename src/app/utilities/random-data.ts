import * as d3 from 'd3';

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
}

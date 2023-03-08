import * as d3 from 'd3';
import { NumberValue } from 'd3';

export class Scales {
  public static getLinearScale<TIn extends NumberValue, TOut, TNever>(
    extend: [NumberValue, NumberValue],
    range: [TIn, TIn]
  ) {
    return d3
      .scaleLinear<TIn, TOut, TNever>()
      .domain([extend[0], extend[1]])
      .range(range);
  }

  public static getPointScale(domain: string[], range: [number, number]) {
    return d3.scalePoint().domain(domain).range(range);
  }

  public static getOrdinalScale(domain: string[], range: [number, number]) {
    const maxRange = d3.max(range)!;
    const minRange = d3.min(range)!;
    const ordinalIntervall = (maxRange - minRange) / domain.length;
    const ranges = domain.map(
      (_: any, i: number) => i * ordinalIntervall + ordinalIntervall / 2
    );
    return d3
      .scaleOrdinal()
      .range([minRange, ...ranges, maxRange])
      .domain(['', ...domain, '']);
  }

  public static getBandScale<T extends { toString(): string }>(
    domain: T[],
    range: [NumberValue, NumberValue]
  ) {
    return d3.scaleBand<T>().range(range).domain(domain);
  }
}

import * as d3 from 'd3';

export class Scales {
  public static getLinearScale(
    extend: [number, number],
    range: [number, number]
  ) {
    return d3.scaleLinear().domain([extend[1], extend[0]]).range(range);
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

  public static getBandScale(domain: string[], range: [number, number]) {
    return d3.scaleBand().range(range).domain(domain);
  }
}

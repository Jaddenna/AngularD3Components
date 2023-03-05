import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ScaleType } from '../enums/scale-type';
import { ChartData } from '../interfaces/chart-data';
import * as d3 from 'd3';
import { ChartService } from '../services/chart.service';
import { LineChartData } from './line-chart-data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [ChartService],
})
export class LineChartComponent implements OnInit, AfterViewInit {
  height: number = 400;
  width: number = 600;

  data: LineChartData<string, number> = { data: [] };
  scaleBand: any;
  scaleLinear: any;
  // lineData: any;
  lineGenerator: any;

  constructor(
    private chartservice: ChartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.generateRandomData();
  }

  getLinearScale() {
    const extend = <number[]>d3.extent(this.data.data, (d) => d.y);
    return d3
      .scaleLinear()
      .domain([extend[1], extend[0]])
      .range([0, this.height]);
  }

  // getOrdinalScale() {
  //   const ordinalIntervall = this.width / this.data.data.length;
  //   const ranges = this.data[0].data.map(
  //     (_: any, i: number) => i * ordinalIntervall + ordinalIntervall / 2
  //   );
  //   return d3
  //     .scaleOrdinal()
  //     .range([0, ...ranges, this.width])
  //     .domain(['', ...this.data.data, '']);
  // }

  // getBandScale() {
  //   return d3.scaleBand().range([0, this.width]).domain(this.data.data);
  // }

  getPointScale() {
    return d3
      .scalePoint()
      .range([0, this.width])
      .domain(this.data.data.map((d) => d.x));
  }

  getLine() {
    const scaleBand = this.scaleBand;
    return d3
      .line<{ x: string; y: number }>()
      .x((i) => {
        return scaleBand(i.x) || 0;
      })
      .y((i) => {
        return this.scaleLinear(i.y);
      });
  }

  generateRandomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomData() {
    this.data.data = d3
      .range(10)
      .map((n) => this.generateRandomIntegerInRange(0, 30))
      .sort((a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
      })
      .map((d, i) => {
        return { x: `data${i}`, y: d };
      });

    this.scaleBand = this.getPointScale();
    this.scaleLinear = this.getLinearScale();
    this.lineGenerator = this.getLine();

    this.cdRef.detectChanges();
    this.chartservice.update();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartservice.update();
    }, 0);
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from '../../../services/chart.service';
import { LineChartData } from './line-chart-data';
import { RandomData } from '../../../utilities/random-data';
import { Scales } from '../../../utilities/scales';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [ChartService],
})
export class LineChartComponent implements OnInit, AfterViewInit {
  height: number = 400;
  width: number = 600;

  data: LineChartData<string, number> = [];
  scaleBand: any;
  scaleLinear: any;
  lineGenerator: any;

  constructor(
    private chartservice: ChartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getLinearScale() {
    const extend = <number[]>d3.extent(this.data, (d) => d.y);
    return Scales.getLinearScale([extend[0], extend[1]], [0, this.height]);
  }

  getPointScale() {
    return Scales.getPointScale(
      this.data.map((d) => d.x),
      [0, this.width]
    );
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

  getData() {
    this.data = RandomData.generateRandomLineData();

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

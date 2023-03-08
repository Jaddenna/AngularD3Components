import { ChangeDetectorRef, Component } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from 'src/app/services/chart.service';
import { RandomData } from 'src/app/utilities/random-data';
import { Scales } from 'src/app/utilities/scales';
import { BarChartData } from './bar-chart-data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  height: number = 400;
  width: number = 600;

  data: BarChartData<string, number> = [];
  scaleBand?: d3.ScaleBand<string>;
  scaleLinear?: d3.ScaleLinear<number, number, never>;

  constructor(
    private chartservice: ChartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getLinearScale() {
    const extend = <number[]>d3.extent(this.data, (d) => d.y);
    return Scales.getLinearScale<number, number, never>(
      [extend[0], extend[1]],
      [0, this.height]
    );
  }

  getBandScale() {
    return Scales.getBandScale(
      this.data.map((d) => d.x),
      [0, this.width]
    );
  }

  getData() {
    this.data = RandomData.generateRandomLineData();
    this.data.padding = 0.3;

    this.scaleBand = this.getBandScale();
    this.scaleLinear = this.getLinearScale();

    this.cdRef.detectChanges();
    this.chartservice.update();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartservice.update();
    }, 0);
  }
}

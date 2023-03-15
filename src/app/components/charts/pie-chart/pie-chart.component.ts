import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from 'src/app/services/chart.service';
import { RandomData } from 'src/app/utilities/random-data';
import { Scales } from 'src/app/utilities/scales';
import { PieChartData, PieChartDatum } from './pie-chart-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  height: number = 400;
  width: number = 600;

  count: number = 2;
  toggle: boolean = false;

  data: PieChartData = [];
  scaleColor?: d3.ScaleOrdinal<string, string, never>;
  pieGenerator: d3.PieArcDatum<PieChartDatum>[] = [];

  constructor(
    private chartservice: ChartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getColorScale() {
    const extend = <number[]>d3.extent(this.data, (d) => d.value);
    return d3
      .scaleOrdinal(d3.schemeBlues[this.data.length])
      .domain(this.data.map((d) => d.key));
  }

  getPieGenerator() {
    return d3
      .pie<PieChartDatum>()
      .sort(null)
      .value((d) => d.value)(this.data);
  }

  getData() {
    this.count = this.count == 9 ? 9 : 9;
    const d = RandomData.generateRandomPieData([2, 9], [5, 55]);
    this.data = d;
    this.toggle = !this.toggle;

    this.scaleColor = this.getColorScale();
    this.data.forEach(
      (d) => (d.fillColor = this.scaleColor ? this.scaleColor(d.key) : 'red')
    );

    this.pieGenerator = this.getPieGenerator();

    this.cdRef.detectChanges();
    this.chartservice.update();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartservice.update();
    }, 0);
  }
}

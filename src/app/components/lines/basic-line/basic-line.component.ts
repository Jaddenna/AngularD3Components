import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import * as d3 from 'd3';
import { BaseChartComponent } from 'src/app/base/base-chart/base-chart.component';
import { LineChartData } from 'src/app/components/charts/line-chart/line-chart-data';

@Component({
  selector: '[app-basic-line]',
  templateUrl: './basic-line.component.svg',
  styleUrls: ['./basic-line.component.scss'],
})
export class BasicLineComponent<xType, yType> extends BaseChartComponent {
  _line: any;
  _data?: LineChartData<xType, yType>;

  @Input()
  get line() {
    return this._line;
  }

  set line(value: any) {
    this._line = value;
  }

  @Input()
  get data() {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  constructor(
    private elRef: ElementRef,
    private chartService: ChartService,
    private ngZone: NgZone
  ) {
    super(elRef, chartService, ngZone);
  }

  draw() {
    if (this.data === undefined) {
      return;
    }

    d3.select(this.elRef.nativeElement)
      .attr('class', 'app-line')
      .select('path')
      .data([this._data])
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', '2')
      .attr('d', this._line(this._data))
      .end()
      .then(() => {
        this.chartService.increaseRenderedChildcount();
      })
      .catch((e) => {});
  }
}

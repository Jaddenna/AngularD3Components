import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { BaseChartComponent } from 'src/app/base/base-chart/base-chart.component';
import { ChartService } from 'src/app/services/chart.service';
import * as d3 from 'd3';
import { LineChartData } from '../../charts/line-chart/line-chart-data';

@Component({
  selector: '[app-basic-bar]',
  templateUrl: './basic-bar.component.svg',
  styleUrls: ['./basic-bar.component.scss'],
})
export class BasicBarComponent<
  xType extends { toString(): string },
  yType extends d3.NumberValue
> extends BaseChartComponent {
  _scaleX?: d3.ScaleBand<xType>;
  _scaleY?: d3.ScaleLinear<yType, number, never>;
  _data?: LineChartData<xType, yType>;

  @Input()
  get scaleX() {
    return this._scaleX;
  }

  set scaleX(value: any) {
    this._scaleX = value;
  }

  @Input()
  get scaleY() {
    return this._scaleY;
  }

  set scaleY(value: any) {
    this._scaleY = value;
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

  draw(): void {
    if (this._data === undefined || this._scaleX === undefined) {
      return;
    }

    const range = d3.max(this._scaleY?.range()!)!;

    d3.select(this.elRef.nativeElement)
      .selectAll('rect.bar')
      .data(this._data!)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => (this._scaleX ? this._scaleX(d.x) || 0 : 0))
      .attr('width', this._scaleX.bandwidth())
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .attr('height', (d) => (this._scaleY ? this._scaleY(d.y) || 0 : 0))
      .attr(
        'y',
        (d) => (range as number) - (this._scaleY ? this._scaleY(d.y) || 0 : 0)
      )
      .attr('fill', 'red')
      .end()
      .then(() => {
        this.chartService.increaseRenderedChildcount();
      })
      .catch((e) => {});
  }
}

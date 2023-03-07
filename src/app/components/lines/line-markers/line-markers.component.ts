import { Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { BaseChartComponent } from 'src/app/base/base-chart/base-chart.component';
import { LineChartData } from 'src/app/components/charts/line-chart/line-chart-data';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: '[app-line-markers]',
  templateUrl: './line-markers.component.html',
  styleUrls: ['./line-markers.component.scss'],
})
export class LineMarkersComponent<xType, yType> extends BaseChartComponent {
  _scaleX: any;
  _scaleY: any;
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

  draw() {
    if (this._data === undefined) {
      return;
    }

    d3.select(this.elRef.nativeElement)
      .attr('class', 'app-line-marker')
      .selectAll('circle.line-marker')
      .data(this._data)
      .join('circle')
      .attr('class', 'line-marker')
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .attr('fill', 'red')
      .attr('stroke', 'black')
      .attr('stroke-width', '2')
      .attr('r', 5)
      .attr('cx', (d) => this._scaleX(d.x))
      .attr('cy', (d) => this._scaleY(d.y))
      .end()
      .then(() => {
        this.chartService.increaseRenderedChildcount();
      })
      .catch((e) => {});
  }
}

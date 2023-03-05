import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { BaseChartComponent } from 'src/app/base/base-chart/base-chart.component';
import { ChartData } from 'src/app/interfaces/chart-data';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: '[app-base-axis]',
  templateUrl: './base-axis.component.html',
  styleUrls: ['./base-axis.component.scss'],
})
export class BaseAxisComponent extends BaseChartComponent {
  _scale: any;

  @Input()
  get scale() {
    return this._scale;
  }

  set scale(value: any) {
    this._scale = value;
  }

  constructor(
    private elRef: ElementRef,
    private chartService: ChartService,
    private ngZone: NgZone
  ) {
    super(elRef, chartService, ngZone);
  }

  draw() {
    const axis = this.getAxis()(this._scale!);

    d3.select(this.elRef.nativeElement)
      .attr('class', 'app-axis')
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .call(axis)
      .end()
      .then(() => {
        this.chartService.increaseRenderedChildcount();
      })
      .catch((e) => {});
  }

  getAxis() {
    return d3.axisLeft;
  }
}

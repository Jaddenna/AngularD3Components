import { Component, ElementRef, NgZone } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { BaseAxisComponent } from '../base-axis/base-axis.component';
import * as d3 from 'd3';

@Component({
  selector: '[app-right-axis]',
  templateUrl: './right-axis.component.html',
  styleUrls: ['./right-axis.component.scss'],
})
export class RightAxisComponent extends BaseAxisComponent {
  constructor(
    private elRefChild: ElementRef,
    private chartServiceChild: ChartService,
    private ngZoneChild: NgZone
  ) {
    super(elRefChild, chartServiceChild, ngZoneChild);
  }

  override draw() {
    const axis = this.getAxis()(this._scale!);

    d3.select(this.elRefChild.nativeElement)
      .attr('class', 'app-axis')
      .attr(
        'transform',
        `translate(${this.chartServiceChild.canvasSize.width}, 0)`
      )
      .call(axis);
  }

  override getAxis() {
    return d3.axisRight;
  }
}

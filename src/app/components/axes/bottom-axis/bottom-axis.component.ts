import { Component, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from 'src/app/services/chart.service';
import { BaseAxisComponent } from '../base-axis/base-axis.component';

@Component({
  selector: '[app-bottom-axis]',
  templateUrl: './bottom-axis.component.html',
  styleUrls: ['./bottom-axis.component.scss'],
})
export class BottomAxisComponent extends BaseAxisComponent {
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
        `translate(0, ${this.chartServiceChild.canvasSize.height})`
      )
      .transition()
      .ease(d3.easeExp)
      .duration(400)
      .call(axis)
      .end()
      .then(() => {
        this.chartServiceChild.increaseRenderedChildcount();
      })
      .catch((e) => {});
  }

  override getAxis() {
    return d3.axisBottom;
  }
}

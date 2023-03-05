import { Component, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { ChartService } from 'src/app/services/chart.service';
import { BaseAxisComponent } from '../base-axis/base-axis.component';

@Component({
  selector: '[app-top-axis]',
  templateUrl: './top-axis.component.html',
  styleUrls: ['./top-axis.component.scss'],
})
export class TopAxisComponent extends BaseAxisComponent {
  constructor(
    private elRefChild: ElementRef,
    private chartServiceChild: ChartService,
    private ngZoneChild: NgZone
  ) {
    super(elRefChild, chartServiceChild, ngZoneChild);
  }

  override getAxis() {
    return d3.axisTop;
  }
}

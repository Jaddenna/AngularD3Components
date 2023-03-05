import { Component, ElementRef, NgZone } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { BaseAxisComponent } from '../base-axis/base-axis.component';

@Component({
  selector: '[app-left-axis]',
  templateUrl: './left-axis.component.html',
  styleUrls: ['./left-axis.component.scss'],
})
export class LeftAxisComponent extends BaseAxisComponent {
  constructor(
    private elRefChild: ElementRef,
    private chartServiceChild: ChartService,
    private ngZoneChild: NgZone
  ) {
    super(elRefChild, chartServiceChild, ngZoneChild);
  }
}

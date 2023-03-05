import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-base-chart',
  template: '',
})
export abstract class BaseChartComponent implements OnInit {
  _subscriptions: Subscription = new Subscription();

  constructor(
    private elRefBase: ElementRef,
    private chartServiceBase: ChartService,
    private ngZoneBase: NgZone
  ) {}

  ngOnInit(): void {
    this.chartServiceBase.increaseChildcount();
    this._subscriptions.add(
      this.chartServiceBase.update$.subscribe(() => {
        this.drawOutsideZone();
      })
    );
  }

  drawOutsideZone() {
    this.ngZoneBase.runOutsideAngular(() => {
      this.draw();
    });
  }

  abstract draw(): void;

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}

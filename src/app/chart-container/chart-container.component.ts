import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { ChartData } from '../interfaces/chart-data';
import { ChartService } from '../services/chart.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.svg',
  styleUrls: ['./chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent implements OnInit, OnDestroy {
  _data: ChartData[] = [];
  _subscriptions: Subscription = new Subscription();

  @ViewChild('chartSvg') chartSvg: ElementRef<SVGElement> | undefined;
  @ViewChild('mainGroup') mainGroup: ElementRef<SVGGElement> | undefined;

  @Input() width: number = 300;
  @Input() height: number = 300;

  viewBox$$: BehaviorSubject<string> = new BehaviorSubject<string>(
    [0, 0, this.width, this.height].join(' ')
  );
  viewBox$: Observable<string> = this.viewBox$$.asObservable();

  @Input()
  public get data() {
    return this._data;
  }

  public set data(value: ChartData[]) {
    this._data = value;
  }

  constructor(
    private chartService: ChartService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.chartService.childRendered$.subscribe(() => this.updateViewBox())
    );
  }

  update() {
    this.chartService.canvasSize = { width: this.width, height: this.height };
  }

  updateViewBox() {
    if (this.chartSvg === undefined || this.mainGroup === undefined) {
      return;
    }
    const bBox = this.mainGroup.nativeElement.getBBox();

    this.viewBox$$.next([bBox.x, bBox.y, bBox.width, bBox.height].join(' '));
    this.cdRef.detectChanges();

    this.chartService.clearRenderedChildren();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}

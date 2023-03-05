import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChartData } from '../interfaces/chart-data';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private childCount: number = 0;
  private renderedChildren: number = 0;

  private update$$ = new Subject<void>();
  public readonly update$: Observable<void> = this.update$$.asObservable();

  private childRendered$$ = new Subject<number>();
  public readonly childRendered$: Observable<number> =
    this.childRendered$$.asObservable();

  private _canvasSize: { width: number; height: number } = {
    width: 600,
    height: 400,
  };
  private canvasSize$$ = new BehaviorSubject<{ width: number; height: number }>(
    this._canvasSize
  );
  public readonly canvasSize$: Observable<{ width: number; height: number }> =
    this.canvasSize$$.asObservable();

  private _data: ChartData[] = [];
  public get data() {
    return this._data;
  }

  public set data(value: ChartData[]) {
    this._data = value;
  }

  public get canvasSize() {
    return this._canvasSize;
  }

  public set canvasSize(value: { width: number; height: number }) {
    this._canvasSize = value;
    this.canvasSize$$.next(this._canvasSize);
  }

  constructor() {}

  childRendered() {
    this.childRendered$$.next(1);
  }

  update() {
    this.update$$.next();
    0;
  }

  increaseChildcount() {
    this.childCount++;
  }

  increaseRenderedChildcount() {
    this.renderedChildren++;
    if (this.childCount === this.renderedChildren) {
      this.childRendered();
    }
  }

  clearRenderedChildren() {
    this.renderedChildren = 0;
  }
}

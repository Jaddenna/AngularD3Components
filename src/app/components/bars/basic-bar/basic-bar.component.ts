import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { BaseChartComponent } from 'src/app/base/base-chart/base-chart.component';
import { ChartService } from 'src/app/services/chart.service';
import * as d3 from 'd3';
import { BarChartData } from '../../charts/bar-chart/bar-chart-data';
import { Scales } from 'src/app/utilities/scales';
import { NumberValue } from 'd3';

@Component({
  selector: '[app-basic-bar]',
  templateUrl: './basic-bar.component.svg',
  styleUrls: ['./basic-bar.component.scss'],
})
export class BasicBarComponent<
  xType extends { toString(): string },
  yType extends d3.NumberValue
> extends BaseChartComponent {
  @Input() scaleX?: d3.ScaleBand<xType>;
  @Input() scaleY?: d3.ScaleLinear<yType, yType, never>;
  @Input() data?: BarChartData<xType, yType>;

  constructor(
    private elRef: ElementRef,
    private chartService: ChartService,
    private ngZone: NgZone
  ) {
    super(elRef, chartService, ngZone);
  }

  draw(): void {
    if (this.data === undefined) {
      return;
    }

    if (this.scaleX === undefined) {
      this.scaleX = Scales.getBandScale(
        this.data.map((d) => d.x),
        [0, this.chartService.canvasSize.width]
      );
    }

    if (this.scaleY === undefined) {
      const extend = d3.extent(this.data.map((d) => d.y));
      this.scaleY = Scales.getLinearScale<yType, yType, never>(
        [extend[0] || 0, extend[1] || 1],
        [
          this.chartService.canvasSize.width as any,
          this.chartService.canvasSize.height as any,
        ]
      );
    }

    if (this.data.padding !== undefined) {
      this.scaleX.padding(this.data.padding);
    }

    const range = d3.max(this.scaleY?.range()!)!;

    d3.select(this.elRef.nativeElement)
      .selectAll('rect.bar')
      .data(this.data!)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => (this.scaleX ? this.scaleX(d.x) || 0 : 0))
      .attr('width', this.scaleX.bandwidth())
      .transition()
      .ease(d3.easeExp)
      .duration(500)
      .attr('height', (d) =>
        this.scaleY !== undefined ? <number>this.scaleY(d.y) : 0
      )
      .attr(
        'y',
        (d) =>
          (range as number) - (this.scaleY ? <number>this.scaleY(d.y) || 0 : 0)
      )
      .attr('fill', 'red')
      .end()
      .then(() => {
        this.chartService.increaseRenderedChildcount();
      })
      .catch((e) => {});
  }
}

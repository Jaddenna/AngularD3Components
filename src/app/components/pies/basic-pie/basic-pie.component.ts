import { Component, ElementRef, Input, NgZone } from '@angular/core';
import * as d3 from 'd3';
import { DefaultArcObject, PieArcDatum } from 'd3';
import { BaseChartComponent } from 'src/app/base/base-chart/base-chart.component';
import { ChartService } from 'src/app/services/chart.service';
import { LineChartData } from '../../charts/line-chart/line-chart-data';
import {
  PieChartData,
  PieChartDatum,
} from '../../charts/pie-chart/pie-chart-data';

@Component({
  selector: '[app-basic-pie]',
  templateUrl: './basic-pie.component.html',
  styleUrls: ['./basic-pie.component.scss'],
})
export class BasicPieComponent extends BaseChartComponent {
  @Input()
  pie: PieChartDatum[] = [];
  _data: PieChartDatum[] = [];

  constructor(
    private elRef: ElementRef,
    private chartService: ChartService,
    private ngZone: NgZone
  ) {
    super(elRef, chartService, ngZone);
  }

  getPieGenerator() {
    return d3
      .pie<PieChartDatum>()
      .sort(null)
      .value((d) => d.value)(this.zip());
  }

  zip() {
    let deleted = this._data
      .filter((d) => this.pie.findIndex((k) => k.key === d.key) < 0)
      .map((d) => {
        return { ...d, value: 0 };
      });

    let added = this.pie.filter(
      (d) => this._data.findIndex((k) => k.key === d.key) < 0
    );

    let updated = this._data.filter(
      (d) => this.pie.findIndex((k) => k.key === d.key) >= 0
    );

    return [...deleted, ...added, ...updated].sort((a, b) =>
      a.key > b.key ? 1 : a.key < b.key ? -1 : 0
    );
  }

  draw() {
    if (this.pie === undefined) {
      return;
    }

    this._data = this._data.map((m) => {
      const index = this.pie.findIndex((p) => p.key === m.key);
      if (index < 0) {
        return { ...m, value: 0 };
      }
      return this.pie[index];
    });

    let inew = 0;

    const arc = d3
      .arc<d3.PieArcDatum<PieChartDatum>>()
      .innerRadius(0)
      .outerRadius(150);

    const arcTween = function (this: any, a: d3.PieArcDatum<PieChartDatum>) {
      const from = this._current || { ...a, startAngle: 0, endAngle: 0 };
      const i = d3.interpolate(from, a);
      this._current = i(0);
      return function (t: number) {
        return arc(i(t))!;
      };
    };

    let t = this.drawPromise(arcTween)
      .then(() => {
        this._data = [...this.pie];
      })
      .catch((exc) => {});
  }

  private drawPromise(
    arcTween: (
      this: any,
      a: d3.PieArcDatum<PieChartDatum>
    ) => (t: number) => string
  ) {
    return new Promise<void>((resolve) => {
      let finishedCount = 0;
      d3.select(this.elRef.nativeElement)
        .attr('class', 'app-line')
        .selectAll('path.arc')
        .data(this.getPieGenerator(), (d: any) => d.data.key)
        .join(
          (enter) => {
            let selection = enter
              .append('path')
              .attr('class', 'arc')
              .attr('fill', (d) => d.data.fillColor || 'none')
              .attr('stroke', 'black')
              .attr('stroke-width', 1);

            selection
              .transition()
              .ease(d3.easeExp)
              .duration(3000)
              .attrTween('d', arcTween)
              .end()
              .then(() => {
                if (++finishedCount == 3) {
                  resolve();
                }
              })
              .catch((exc) => {});
            return selection;
          },
          (update) => {
            update
              .transition()
              .ease(d3.easeExp)
              .duration(3000)
              .attrTween('d', arcTween)
              .end()
              .then(() => {
                if (++finishedCount == 3) {
                  resolve();
                }
              })
              .catch((exc) => {});

            return update;
          },
          (exit) => {
            exit
              .transition()
              .ease(d3.easeExp)
              .duration(3000)
              .attrTween('d', arcTween)
              .on('end', function () {
                d3.select(this).remove();
              })
              .end()
              .then(() => {
                if (++finishedCount == 3) {
                  resolve();
                }
              })
              .catch((exc) => {});
            return exit;
          }
        );
    });
  }
}

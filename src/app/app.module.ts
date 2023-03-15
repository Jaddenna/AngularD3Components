import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { BaseAxisComponent } from './components/axes/base-axis/base-axis.component';
import { LeftAxisComponent } from './components/axes/left-axis/left-axis.component';
import { BottomAxisComponent } from './components/axes/bottom-axis/bottom-axis.component';
import { TopAxisComponent } from './components/axes/top-axis/top-axis.component';
import { RightAxisComponent } from './components/axes/right-axis/right-axis.component';
import { BasicLineComponent } from './components/lines/basic-line/basic-line.component';
import { LineMarkersComponent } from './components/lines/line-markers/line-markers.component';
import { BaseChartComponent } from './base/base-chart/base-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { BasicBarComponent } from './components/bars/basic-bar/basic-bar.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { BasicPieComponent } from './components/pies/basic-pie/basic-pie.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartContainerComponent,
    LineChartComponent,
    BaseAxisComponent,
    LeftAxisComponent,
    BottomAxisComponent,
    TopAxisComponent,
    RightAxisComponent,
    BasicLineComponent,
    LineMarkersComponent,
    BarChartComponent,
    BasicBarComponent,
    PieChartComponent,
    BasicPieComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

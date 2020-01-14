import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { ColorSketchModule } from 'ngx-color/sketch';

import { AppComponent } from './app.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { ChartManagementComponent } from './components/chart-management/chart-management.component';

import { GetForecastService } from './services/get-forecast.service';
import { HighchartsService } from './services/highcharts.service';
import {
  ColorSketchWrapperComponent
} from './components/chart-management/color-sketch-wrapper/color-sketch-wrapper.component';
import { OutsideClickDirective } from './directives/outside-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    SelectDateComponent,
    ChartManagementComponent,
    ColorSketchWrapperComponent,
    OutsideClickDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ChartModule,
    ColorSketchModule
  ],
  providers: [
    GetForecastService,
    HighchartsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

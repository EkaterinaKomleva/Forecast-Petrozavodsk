import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { ChartManagementComponent } from './chart-management/chart-management.component';

import { GetForecastService } from './get-forecast.service';
import { InterfacesService } from './interfaces.service';
import { HighchartsService } from './highcharts.service';

@NgModule({
  declarations: [
    AppComponent,
    SelectDateComponent,
    ChartManagementComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    GetForecastService,
    InterfacesService,
    HighchartsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

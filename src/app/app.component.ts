import { Component, OnInit } from '@angular/core';
import { HighchartsService } from './highcharts.service';
import { GetForecastService } from './get-forecast.service';
import { ResponseI, DayI } from './interfaces.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  daysParams: DayI[];
  day: DayI;
  charts: Chart[] = [];
  // type: string;

  constructor(
    private highchartsService: HighchartsService,
    private getForecastService: GetForecastService
    ) {}

  ngOnInit() {
    this.getForecastService.getForecast()
      .subscribe((response: ResponseI) => {
        this.daysParams = this.highchartsService.getForecastParams(response.list);
        this.getCharts(this.daysParams[0]);
        // console.log(this.daysParams);
      });
  }

  onChooseDay(event) {
    this.day = this.daysParams.find((day: DayI) => day.date.includes(event.trim()));
    // console.log(this.day);
    this.getCharts(this.day);
  }

  getCharts(day: DayI) {
    this.charts = [];
    this.charts.push(this.highchartsService.getChart(day.time, day.temperature, 'Temperature, ℃', 'Average daily temperature'));
    this.charts.push(this.highchartsService.getChart(day.time, day.humidity, 'Humidity, %', 'Humidity'));
    this.charts.push(this.highchartsService.getChart(day.time, day.precipitation, 'Precipitation, mm', 'Precipitation'));
    this.charts.push(this.highchartsService.getChart(day.time, day.wind, 'Wind speed, m/s', 'Wind'));
    console.log(this.charts);
  }

  onChangeChartType(type) {
    // this.type = type;
    // this.highchartsService.
  }
}

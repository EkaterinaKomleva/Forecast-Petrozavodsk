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

  constructor(
    private highchartsService: HighchartsService,
    private getForecastService: GetForecastService
    ) {}

  ngOnInit() {
    this.getForecastService.getForecast()
      .subscribe((response: ResponseI) => {
        this.daysParams = this.highchartsService.getForecastParams(response.list);
        this.getCharts(this.daysParams[0]);
      });
  }

  onChooseDay(event) {
    this.day = this.daysParams.find((day: DayI) => day.date.includes(event.trim()));
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

  onChangeChartType(type, chartTitle) {
    const currentChart = this.charts.find((chart: any) => chart.options.title.text === chartTitle);
    this.highchartsService.changeType(currentChart, type);
  }
}

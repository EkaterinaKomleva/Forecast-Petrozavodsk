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
  optionsForChart: string[];
  // selectOption: string;

  constructor(
    private highchartsService: HighchartsService,
    private getForecastService: GetForecastService
    ) {}

  ngOnInit() {
    this.getForecastService.getForecast()
      .subscribe((response: ResponseI) => {
        this.daysParams = this.highchartsService.getForecastParams(response.list);
        this.getCharts(this.daysParams[0]);
        this.getSelectOptionsForChart();
      });
  }

  onChooseDay(event) {
    this.day = this.daysParams.find((day: DayI) => day.date.includes(event.trim()));
    this.getCharts(this.day);
  }

  getCharts(day: DayI) {
    this.charts = [];
    this.charts.push(this.highchartsService.getChart(day.time, day.temperature, 'Temperature, ℃', 'Average daily temperature', 'area'));
    this.charts.push(this.highchartsService.getChart(day.time, day.humidity, 'Humidity, %', 'Humidity', 'area'));
    this.charts.push(this.highchartsService.getChart(day.time, day.precipitation, 'Precipitation, mm', 'Precipitation', 'area'));
    this.charts.push(this.highchartsService.getChart(day.time, day.wind, 'Wind, m/s', 'Wind', 'area'));
    console.log(this.charts);
  }

  onChangeChartType(type, currentChart) {
    const properties = [
      currentChart.options.xAxis.categories,
      currentChart.options.series[0].data,
      currentChart.options.series[0].name,
      currentChart.options.title.text,
      type
    ];
    this.charts.forEach((chart: any, index) => {
      if (chart.options.title.text === currentChart.options.title.text) {
        this.charts[index] = (this.highchartsService.getChart as any)(...properties);
      }
    });
    console.log(this.charts);
    return this.charts;
  }

  getSelectOptionsForChart() {
    this.optionsForChart = this.charts.map((chart: any) => chart.options.yAxis.title.text);
    // console.log(this.optionsForChart);
  }

  onChartAddSeries(option, currentChart) {
    const sourseChart: any = this.charts.find((chart: any) => chart.options.yAxis.title.text === option);
    const series = sourseChart.options.series[0].data;
    series.name = sourseChart.options.series[0].name;
    console.log(series);
    // this.highchartsService.addChartSeries(currentChart, series);
  }
}

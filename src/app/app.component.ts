import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HighchartsService } from './services/highcharts.service';
import { GetForecastService } from './services/get-forecast.service';
import { ResponseI } from './models/forecastResponse';
import { DayI } from './models/forecastDay';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  daysParams: DayI[];
  charts: Chart[] = [];
  optionsForChart: string[];

  constructor(
    private highchartsService: HighchartsService,
    private getForecastService: GetForecastService,
    private changeDetection: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.getForecastService.getForecast()
      .subscribe((response: ResponseI) => {
        this.daysParams = this.highchartsService.getForecastParams(response.list);
        this.getCharts(this.daysParams[0]);
        this.changeDetection.detectChanges();
      });
  }

  onChooseDay(date): void {
    const day = this.daysParams.find((d: DayI) => d.date.includes(date.trim()));
    this.updateCharts(day);
  }

  updateCharts(day: DayI) {
    const dayFields = Object.keys(day);

    this.charts.forEach((chart: any, i: number) => {
      const index = dayFields.indexOf(chart.options.series[0].name.toLowerCase());
      const value = dayFields[index];
      const properties = {
        time: day.time,
        values: day[value],
        name: chart.options.yAxis.title.text,
        title: chart.options.title.text,
        type: chart.options.series[0].type,
        color: chart.options.series[0].color
      };
      this.charts[i] = (this.highchartsService.getChart as any)(...Object.values(properties));
    });
  }

  getCharts(day: DayI): void {
    this.charts = [
      this.highchartsService.getChart(day.time, day.temperature, 'Temperature, ℃', 'Average daily temperature', undefined, '#FF7C0B'),
      this.highchartsService.getChart(day.time, day.humidity, 'Humidity, %', 'Humidity', undefined, '#45C0D6'),
      this.highchartsService.getChart(day.time, day.precipitation, 'Precipitation, mm', 'Precipitation', undefined, '#3C57FA'),
      this.highchartsService.getChart(day.time, day.wind, 'Wind, m/s', 'Wind', undefined, '#F4D225')
    ];
  }

  onChangeChartProp(arg, currentChart): void {
    const properties = {
      time: currentChart.options.xAxis.categories,
      values: currentChart.options.series[0].data,
      name: currentChart.options.yAxis.title.text,
      title: currentChart.options.title.text,
      type: currentChart.options.series[0].type,
      color: currentChart.options.series[0].color,
    };

    if (arg.includes('#')) {
      properties.color = arg;
    } else {
      properties.type = arg;
    }

    this.charts.forEach((chart: any, index) => {
      if (chart.options.title.text === currentChart.options.title.text) {
        this.charts[index] = (this.highchartsService.getChart as any)(...Object.values(properties));
      }
    });
  }

  trackByFn(index): number {
    return index;
  }
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HighchartsService } from './highcharts.service';
import { GetForecastService } from './get-forecast.service';
import { ResponseI, DayI } from './interfaces.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  daysParams: DayI[];
  day: DayI;
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
        this.getSelectOptionsForChart();
        this.changeDetection.detectChanges();
      });
  }

  onChooseDay(event): void {
    this.day = this.daysParams.find((day: DayI) => day.date.includes(event.trim()));
    this.getCharts(this.day);
  }

  getCharts(day: DayI): void {
    this.charts = [
      this.highchartsService.getChart(day.time, day.temperature, 'Temperature, ℃', 'Average daily temperature'),
      this.highchartsService.getChart(day.time, day.humidity, 'Humidity, %', 'Humidity'),
      this.highchartsService.getChart(day.time, day.precipitation, 'Precipitation, mm', 'Precipitation'),
      this.highchartsService.getChart(day.time, day.wind, 'Wind, m/s', 'Wind')
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

    this.charts.forEach((chart: any, index): void => {
      if (chart.options.title.text === currentChart.options.title.text) {
        this.charts[index] = (this.highchartsService.getChart as any)(...Object.values(properties));
      }
    });
  }

  getSelectOptionsForChart(): void {
    this.optionsForChart = this.charts.map((chart: any) => chart.options.yAxis.title.text);
  }

  onGetChartForRendering(option, currentChart): void {
    this.charts.forEach((chart: any) => {
      if (chart.options.yAxis.title.text === option) {
        const newSeries = {
          type: currentChart.options.series[0].type,
          name: chart.options.series[0].name,
          data: chart.options.series[0].data
        };
        currentChart.addSeries(newSeries);
      }
    });
  }

  trackByFn(index): number {
    return index;
  }
}

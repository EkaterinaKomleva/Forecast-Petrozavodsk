import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HighchartsService } from './highcharts.service';
import { GetForecastService } from './get-forecast.service';
import { ResponseI, DayI, ButtonI } from './interfaces.service';
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
  currentButton: ButtonI;
  buttons: ButtonI[] = [];
  // selectOption: string;

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
    // console.log(this.charts);
  }

  onChangeChart(type, currentChart) {
    const properties = [
      currentChart.options.xAxis.categories,
      currentChart.options.series[0].data,
      currentChart.options.series[0].name,
      currentChart.options.title.text,
      type,
    ];
    this.charts.forEach((chart: any, index): void => {
      if (chart.options.title.text === currentChart.options.title.text) {
        this.charts[index] = (this.highchartsService.getChart as any)(...properties);
      }
    });
    // console.log(this.charts);
  }

  onActivateButton(buttons) {
    this.buttons = buttons;
    console.log(this.buttons);
  }

  getCurrentButton(currentButton) {
    this.currentButton = currentButton;
    this.buttons.map(button => {
      button.active = false;
      if (button.type === currentButton.type) { button.active = true; }
      return button;
    });
    // console.log(this.buttons);
  }

  getSelectOptionsForChart() {
    this.optionsForChart = this.charts.map((chart: any) => chart.options.yAxis.title.text);
    console.log(this.optionsForChart);
  }

  onAddChart(option, currentChart) {
    const sourseChart: any = this.charts.find((chart: any) => chart.options.yAxis.title.text === option);
    const series = sourseChart.options.series[0].data;
    series.name = sourseChart.options.series[0].name;
    series.type = 'column';
    currentChart.options.series.push(series);
    // console.log(currentChart);
    this.onChangeChart(currentChart.options.series[0].type, currentChart);
  }
}

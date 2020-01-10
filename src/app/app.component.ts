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

  onChooseDay(event): void {
    this.day = this.daysParams.find((day: DayI) => day.date.includes(event.trim()));
    this.getCharts(this.day);
  }

  getCharts(day: DayI) {
    this.charts = [];
    this.charts.push(this.highchartsService.getChart(day.time, day.temperature, 'Temperature, ℃', 'Average daily temperature'));
    this.charts.push(this.highchartsService.getChart(day.time, day.humidity, 'Humidity, %', 'Humidity'));
    this.charts.push(this.highchartsService.getChart(day.time, day.precipitation, 'Precipitation, mm', 'Precipitation'));
    this.charts.push(this.highchartsService.getChart(day.time, day.wind, 'Wind, m/s', 'Wind'));
  }

  onChangeChartProp(arg, currentChart): void {
    const properties = {
      date: currentChart.options.xAxis.categories,
      time: currentChart.options.series[0].data,
      name: currentChart.options.series[0].name,
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

  getButtons(buttons): void {
    this.buttons = buttons;
  }

  getCurrentButton(currentButton): void {
    this.buttons.map(button => {
      button.active = false;
      if (button.type === currentButton.type) { button.active = true; }
    });
  }

  getSelectOptionsForChart(): void {
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
    // this.onChangeChart(currentChart.options.series[0].type, currentChart);
  }
}

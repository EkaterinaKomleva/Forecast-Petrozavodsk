import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DayI } from './interfaces.service';
import * as moment from 'moment';
import { chart } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class HighchartsService {

  day: DayI | null = {
    date: '',
    time: [],
    temperature: [],
    humidity: [],
    precipitation: [],
    wind: [],
    order: 0
  };

  params: DayI[] = [];
  paramsForChart: DayI;

  constructor() { }

  getChart(hours, values, text, title): Chart {
    return new Chart({
      title: {
        text: title
      },
      subtitle: {
        text: 'Source: openweathermap.org'
      },
      xAxis: {
        categories: hours
      },
      yAxis: {
        title: {
        text
        }
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [{
        type: 'area',
        name: 'Петрозаводск',
        data: values
      }]
    });
  }

  getForecastParams(data) {
    console.log(data);
    this.day.date = this.getDate(data[0].dt_txt);

    data.forEach(item => {
      const __date = this.getDate(item.dt_txt);

      if (this.day.date !== __date) {
        this.day.order += 1;
        this.params.push(this.day);
        this.day = JSON.parse(JSON.stringify(this.day));
        this.day.date = this.getDate(item.dt_txt);
        this.day.time = [];
        this.day.temperature = [];
        this.day.humidity = [];
        this.day.precipitation = [];
        this.day.wind = [];
      }
      this.day.time.push(this.getTime(item.dt_txt));
      this.day.temperature.push(item.main.temp);
      this.day.humidity.push(item.main.humidity);
      if (item.rain) {
        this.day.precipitation.push(item.rain['3h']);
      }
      this.day.wind.push(item.wind.speed);
    });

    if (this.day.time.length === 8) {
      this.params.push(this.day);
    }

    return this.params;
    // console.log(this.params);
  }

  getDate(item) {
    return moment.utc(item).utcOffset(180).format('MMMM D');
  }

  getTime(item) {
    return moment.utc(item).utcOffset(180).format('H:mm');
  }

  changeType(currentChart: any, seriesType) {
    console.log(currentChart);
    currentChart.update({
      series: [{
        type: seriesType
      }]
    });
  }
}

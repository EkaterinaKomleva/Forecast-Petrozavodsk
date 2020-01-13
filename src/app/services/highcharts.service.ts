import { Injectable } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DayI } from '../interfaces.service';
import * as moment from 'moment';

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
  };

  params: DayI[] = [];
  paramsForChart: DayI;

  getChart(time, values, text, title, chartType = 'area', chartColor = '#FF7C0B'): Chart {
    return new Chart({
      title: {
        text: title
      },
      subtitle: {
        text: 'Source: openweathermap.org'
      },
      xAxis: {
        categories: time
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
        type: (chartType as any),
        name: text.split(',')[0],
        data: values,
        color: chartColor,
      }]
    });
  }

  getForecastParams(data): DayI[] {
    this.day.date = this.getDate(data[0].dt_txt);

    data.forEach(item => {
      const __date = this.getDate(item.dt_txt);

      if (this.day.date !== __date) {
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
  }

  private getDate(item): string {
    return moment.utc(item).utcOffset(180).format('MMMM D');
  }

  private getTime(item): string {
    return moment.utc(item).utcOffset(180).format('H:mm');
  }

}

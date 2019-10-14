import { Component, OnInit } from '@angular/core';
import { HighchartsService } from './highcharts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  charts: any = [{
    name: 'Temperature',
    chart: null
  }, {
    name: 'Humidiity',
    chart: null
  }, {
    name: 'Wind',
    chrt: null
  }];

  constructor(private highchartsService: HighchartsService) {}

  onDay(event) {
    console.log(event);
  }

  ngOnInit() {
    this.charts.forEach((chart, index) => this.charts[index] = this.highchartsService.getChart());
    console.log(this.charts);
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart-management',
  templateUrl: './chart-management.component.html',
  styleUrls: ['./chart-management.component.scss']
})
export class ChartManagementComponent implements OnInit {

  name: string;
  chart: Chart;

  constructor() { }

  ngOnInit() {
  }

}

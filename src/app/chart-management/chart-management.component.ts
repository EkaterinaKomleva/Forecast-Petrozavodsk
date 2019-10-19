import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HighchartsService } from '../highcharts.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart-management',
  templateUrl: './chart-management.component.html',
  styleUrls: ['./chart-management.component.scss']
})
export class ChartManagementComponent implements OnInit {

  @Output() chartType = new EventEmitter<string>();

  constructor(private highchartsService: HighchartsService) { }

  ngOnInit() {
  }

  onEmitChartType(type) {
    this.chartType.emit(type);
  }
}

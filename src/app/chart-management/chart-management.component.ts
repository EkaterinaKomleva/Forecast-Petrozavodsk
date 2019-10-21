import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HighchartsService } from '../highcharts.service';

@Component({
  selector: 'app-chart-management',
  templateUrl: './chart-management.component.html',
  styleUrls: ['./chart-management.component.scss']
})
export class ChartManagementComponent implements OnInit {

  @Input() optionsForChart: string[];
  @Output() chartType = new EventEmitter<string>();
  @Output() selectValue = new EventEmitter<string>();

  constructor(private highchartsService: HighchartsService) { }

  ngOnInit() {
  }

  onEmitChartType(type) {
    this.chartType.emit(type);
  }

  onOptionChange(selectElem: HTMLSelectElement) {
    this.selectValue.emit(selectElem.value);
  }
}

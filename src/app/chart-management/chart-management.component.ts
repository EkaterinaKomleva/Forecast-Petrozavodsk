import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
} from '@angular/core';
import { ButtonI } from '../interfaces.service';
import { color } from 'highcharts';

@Component({
  selector: 'app-chart-management',
  templateUrl: './chart-management.component.html',
  styleUrls: ['./chart-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartManagementComponent implements OnInit {

  @Input() optionsForChart: string[];
  @Input() item;

  @Output() chartType = new EventEmitter<string>();
  @Output() color = new EventEmitter<string>();
  @Output() currentOption = new EventEmitter<string>();

  buttons: ButtonI[] = [{
    type: 'line',
    icon: 'fa fa-line-chart',
    active: false
  }, {
    type: 'column',
    icon: 'fa fa-bar-chart',
    active: false
  }, {
    type: 'area',
    icon: 'fa fa-area-chart',
    active: true
  }];

  isShowColorPicker = false;
  options: string[] = [];

  constructor(
    private changeDetection: ChangeDetectorRef,
    private element: ElementRef,
    ) { }

  ngOnInit() {
    console.log('LOL');
    this.options = this.optionsForChart.slice(0);
    this.getCurrentOptions();
  }

  onEmitChartType(type, dropdown: HTMLDivElement): void {
    this.makeChartOptionsActive(dropdown);
    this.buttons.forEach((button: ButtonI) => {
      button.active = false;

      if (button.type === type) {
        button.active = true;
      }
    });
    this.chartType.emit(type);
  }

  makeChartOptionsActive(dropdown: HTMLDivElement) {
    Array.from(dropdown.children).forEach(option => {
      option.classList.remove('disabled');
    });
  }

  onShowOrHideDropdown(dropdown: HTMLDivElement): void {
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }

  getCurrentOptions(): void {
    this.optionsForChart = this.options.slice(0);
    this.optionsForChart.forEach(option => {
      if (this.item.options.yAxis.title.text === option) {
        const index = this.optionsForChart.indexOf(option);
        if (this.optionsForChart.length === 4) {
          this.optionsForChart.splice(index, 1);
        }
      }
    });
  }

  onSelectItem(option, curOption): void {
    curOption.classList.add('disabled');
    this.currentOption.emit(option);
  }

  onGetColor(newColor: string): undefined {
    if (!newColor) {
      this.isShowColorPicker = false;
      return;
    }

    this.color.emit(newColor);
    this.isShowColorPicker = false;
  }

  onShowColorPicker(dropdown: HTMLDivElement): void {
    this.makeChartOptionsActive(dropdown);
    this.isShowColorPicker = true;
  }

  onClose(dropdown: HTMLDivElement): void {
    if (dropdown) {
      dropdown.style.display = 'none';
    } else { this.isShowColorPicker = false; }
  }
}

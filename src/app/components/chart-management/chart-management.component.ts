import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ButtonI } from '../../models/forecastButton';

@Component({
  selector: 'app-chart-management',
  templateUrl: './chart-management.component.html',
  styleUrls: ['./chart-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartManagementComponent {

  @Input() item;

  @Output() chartType = new EventEmitter<string>();
  @Output() color = new EventEmitter<string>();

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

  onEmitChartType(type): void {
    this.buttons.forEach((button: ButtonI) => {
      button.active = false;

      if (button.type === type) {
        button.active = true;
      }
    });
    this.chartType.emit(type);
  }

  onGetColor(newColor: string): void | undefined {
    if (!newColor) {
      this.isShowColorPicker = false;
      return;
    }

    this.color.emit(newColor);
    this.isShowColorPicker = false;
  }

  onShowColorPicker(): void {
    this.isShowColorPicker = true;
  }

  onClose(): void {
    this.isShowColorPicker = false;
  }
}

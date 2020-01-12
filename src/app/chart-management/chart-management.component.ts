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

  @Output() chartType = new EventEmitter<string>();
  @Output() selectValue = new EventEmitter<string>();
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
  isShowChart: boolean; // пока не понятно к какому именно графику применять

  constructor(
    private changeDetection: ChangeDetectorRef,
    private element: ElementRef,
    ) { }

  ngOnInit() {
    console.log('LOL');
  }

  onEmitChartTypeAndButton(type) {
    this.buttons.forEach((button: ButtonI) => {
      button.active = false;

      if (button.type === type) {
        button.active = true;
      }
    });
    this.chartType.emit(type);
  }

  // onOptionChange(selectElem: HTMLSelectElement) {
  //   this.selectValue.emit(selectElem.value);
  // }

  onShowOrHideDropdown(dropdown: HTMLDivElement): void {
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }

  onSelectItem(option): void {
    const sel = this.element.nativeElement;
    const sel2 = sel.querySelector('pre');
    sel2.innerText = `  ${option}`;
    this.currentOption.emit(option);
  }

  onGetColor(newColor: string) {
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

  onClose(dropdown: HTMLDivElement): void {
    if (dropdown) {
      dropdown.style.display = 'none';
    } else { this.isShowColorPicker = false; }
  }
}

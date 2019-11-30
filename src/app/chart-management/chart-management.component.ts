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
  @Input() set refreshedButtons(data: ButtonI[]) {
    if (!data.length) { return; }
    this.buttons = data;
  }
  // @Input() charts: any[];

  @Output() chartType = new EventEmitter<string>();
  @Output() buttonsConfig = new EventEmitter<ButtonI[]>();
  @Output() currentButton = new EventEmitter<ButtonI>();
  @Output() selectValue = new EventEmitter<string>();

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

  constructor(
    private changeDetection: ChangeDetectorRef,
    private element: ElementRef,
    ) { }

  ngOnInit() {
    this.buttonsConfig.emit(this.buttons);
    // console.log(this.charts);
  }

  onEmitChartTypeAndButton(type, button) {
    this.chartType.emit(type);
    this.currentButton.emit(button);
    this.changeDetection.detectChanges();
  }

  onUpdateButtons(type) {
    this.buttons.forEach((button: ButtonI) => {
      button.active = false;

      if (button.type === type) {
        button.active = true;
      }
    });
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

  onSelectItem(option) {
    const sel = this.element.nativeElement;
    const sel2 = sel.querySelector('pre');
    sel2.innerText = `  ${option}`;
  }

  changeComplete(event) {
    console.log(event);
  }

  onShowColorPicker(event): void {
    this.isShowColorPicker = true;
  }

}
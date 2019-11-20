import { Component, Output, EventEmitter, Input, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ButtonI } from '../interfaces.service';

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
    // console.log(data);
    this.buttons = data;
  }
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

  constructor(
    private changeDetection: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.buttonsConfig.emit(this.buttons);
  }

  onEmitChartType(type, button) {
    // console.log(type);

    // const bar = [...this.buttons];
    // this.buttons = [];

    // this.buttons = JSON.parse(JSON.stringify(this));
    // const newButtons = this.buttons.map((button: ButtonI) => Object.assign({}, button));
    // this.buttons = [];
    // this.buttons = newButtons;

    // this.onUpdateButtons();
    this.chartType.emit(type);
    // this.buttonsConfig.emit(this.buttons);
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

  onSelectItem() {
    // console.log('');
  }

}

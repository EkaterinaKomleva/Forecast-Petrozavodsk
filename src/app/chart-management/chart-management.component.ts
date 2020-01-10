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

  isShowColorPicker: boolean;
  presetColors: string[] = ['#F74723', '#FF7C0B', '#F4D225', '#7BC25D', '#00BD78', '#45C0D6', '#2582F4', '#3C57FA', '#AF4DFF', '#F04391'];
  // state: StateI = {
  //   buttonType: 'area',
  //   color: '#9dc8f1'
  // };

  constructor(
    private changeDetection: ChangeDetectorRef,
    private element: ElementRef,
    ) { }

  ngOnInit() {
    this.buttonsConfig.emit(this.buttons);
    this.isShowColorPicker = false;
    console.log('LOL');
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
    const newColor = event.color.hex;
    this.color.emit(newColor);
    console.log(newColor);
  }

  onShowColorPicker(): void {
    this.isShowColorPicker = true;
    // const colorPicker = document.createElement('div');
    // colorPicker.innerHTML = this.template;
    // document.append(colorPicker);
  }

}

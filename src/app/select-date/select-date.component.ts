import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as moment from 'moment';
import { ButtonI } from '../interfaces.service';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {

  @Input() buttons: ButtonI[];

  @Output() nameOfDay = new EventEmitter<string>();
  @Output() refreshedButtons = new EventEmitter<ButtonI[]>();

  selectOptions = [
    {date: moment(new Date()).add(3, 'hours').format('MMMM D'), value: 0},
    {date: moment(new Date()).add(1, 'days').add(3, 'hours').format('MMMM D'), value: 1},
    {date: moment(new Date()).add(2, 'days').add(3, 'hours').format('MMMM D'), value: 2},
    {date: moment(new Date()).add(3, 'days').add(3, 'hours').format('MMMM D'), value: 3},
    {date: moment(new Date()).add(4, 'days').add(3, 'hours').format('MMMM D'), value: 4}
  ];

  constructor() { }

  ngOnInit() {
    // console.log(this.selectOptions);
  }

  onOptionChange(selectElem: HTMLSelectElement) {
    const day = selectElem[+selectElem.value].innerHTML;
    this.nameOfDay.emit(day);
    this.buttons.map((button, index) => {
      if (index === 2) {
        button.active = true;
      } else {
        button.active = false;
      }
    });
  }

}

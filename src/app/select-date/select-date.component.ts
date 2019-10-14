import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {

  @Output() nameOfDay = new EventEmitter<string>();

  selectOptions = [
    {date: moment(new Date()).format('MMMM Do').slice(0, -2), value: 1},
    {date: moment(new Date()).add(1, 'days').format('MMMM Do').slice(0, -2), value: 2},
    {date: moment(new Date()).add(2, 'days').format('MMMM Do').slice(0, -2), value: 3},
    {date: moment(new Date()).add(3, 'days').format('MMMM Do').slice(0, -2), value: 4},
    {date: moment(new Date()).add(4, 'days').format('MMMM Do').slice(0, -2), value: 5}
  ];

  day: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.selectOptions);
  }

  onOptionChange(selectElem: HTMLSelectElement) {
    const day = selectElem[+selectElem.value - 1].innerHTML;
    this.day = day;
    this.nameOfDay.emit(this.day);
  }

}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent {

  @Output() nameOfDay = new EventEmitter<string>();

  selectOptions = [
    {date: moment(new Date()).add(3, 'hours').format('MMMM D'), value: 0},
    {date: moment(new Date()).add(1, 'days').add(3, 'hours').format('MMMM D'), value: 1},
    {date: moment(new Date()).add(2, 'days').add(3, 'hours').format('MMMM D'), value: 2},
    {date: moment(new Date()).add(3, 'days').add(3, 'hours').format('MMMM D'), value: 3},
    {date: moment(new Date()).add(4, 'days').add(3, 'hours').format('MMMM D'), value: 4}
  ];

  onOptionChange(day, currentDate: HTMLDivElement): void {
    console.log(currentDate);
    currentDate.innerHTML = day;
    this.nameOfDay.emit(day);
  }

  onShowOrHideDropdown(dropdown: HTMLDivElement): void {
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }

  onClose(dropdown: HTMLDivElement): void {
    dropdown.style.display = 'none';
  }
}

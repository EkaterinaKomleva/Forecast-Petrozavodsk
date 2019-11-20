import { Injectable } from '@angular/core';

export interface ResponseI {
  list: object[];
}
export interface DayI {
  date: string;
  time: string[];
  temperature: number[];
  humidity: number[];
  precipitation: string[];
  wind: number[];
}

export interface ButtonI {
  type: string;
  icon: string;
  active: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class InterfacesService {

  constructor() { }
}

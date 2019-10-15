import { Injectable } from '@angular/core';

export interface ResponseI {
  list: object[];
}
export interface DayI {
  date: string;
  // values: string[];
  time: string[];
  temperature: number[];
  humidity: number[];
  wind: number[];
  order: number;
}

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {

  constructor() { }
}

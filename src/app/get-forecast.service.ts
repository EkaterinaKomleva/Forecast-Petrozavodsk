import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetForecastService {

  private cityId = '509820';
  private metric = 'metric';
  private MY_KEY = '69a8a25ac72c1b683cf93ac166329be8';
  private language = 'ru';
  // private timezone = '10800';

  constructor(private http: HttpClient) { }

  getForecast() {
    const params =  {
      id: this.cityId,
      units: this.metric,
      APPID: this.MY_KEY,
      lang: this.language,
      // timezone: this.timezone
    };
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast`, { params });
  }
}

// прокинула таймзону, пока не знаю работает или нет, вообще ответа с сервера не получаю

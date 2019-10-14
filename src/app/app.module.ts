import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { ChartManagementComponent } from './chart-management/chart-management.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectDateComponent,
    ChartManagementComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

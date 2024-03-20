import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/dashboard/form/form.component';
import { CardComponent } from './components/dashboard/card/card.component';
import { ChartComponent } from './components/dashboard/chart/chart.component';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
  declarations: [AppComponent, FormComponent, CardComponent, ChartComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

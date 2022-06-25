import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { NavComponent } from './nav/nav.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProvincieService } from 'src/services/provincie.service';
// Add FormsModel for two-way-bindings and export below in @ngModule in imports property
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProvinciaComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpClientModule, ProvincieService],
  bootstrap: [AppComponent],
})
export class AppModule {}

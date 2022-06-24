import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ProvinciaComponent } from './provincia/provincia.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ProvincieService } from 'src/services/provincie.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProvinciaComponent, NavComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HttpClientModule, ProvincieService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProvinciaComponent } from './provincia/provincia.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProvincieService } from 'src/services/provincie.service';
// Add FormsModel for two-way-bindings and export below in @ngModule in imports property
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProvinciaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [HttpClientModule, ProvincieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

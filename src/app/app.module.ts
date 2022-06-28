import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProvinciaComponent } from './provincia/provincia.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProvincieService } from 'src/services/provincie.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FilterProvinciePipe } from 'src/shared/filter-provincie.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProvinciaComponent,
    FilterProvinciePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClientModule, ProvincieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProvincieService } from 'src/services/provincie.service';
import { Provincia } from 'src/models/provincia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weatherData: any;
  weather: any;
  provincie: Provincia[] = [];

  constructor(public provincieService: ProvincieService) {
    this.provincie = this.provincieService.ProvincieList;
  }

  ngOnInit(): void {}

  getIcon(provincia: any) {
    if (!provincia || !provincia.list) {
      return '03n';
    }
    return provincia?.list[0]?.weather[0]?.icon;
  }
}

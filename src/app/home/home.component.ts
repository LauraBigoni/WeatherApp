import { Component, OnInit } from '@angular/core';
import provincie from '../../_files/provincie.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public ProvincieList: {
    city: string;
    lat: number;
    lng: number;
    region: string;
    list: any[];
  }[] = provincie;

  endPoint = 'api.openweathermap.org/data/2.5/forecast';
  apiKey = '613360f9278a6f99821f64660a79a1b8';
  metric = 'units';
  lang = 'it';
  weatherData: any;
  weather: any;
  constructor(private http: HttpClient) {
    this.ProvincieList.sort((a, b) => (a.city > b.city ? 1 : -1));
  }

  ngOnInit(): void {
    this.fetchWeather();
  }
  // Fetch Weather
  fetchWeather() {
    this.ProvincieList.forEach((provincia) => {
      return this.http
        .get(
          `https://${this.endPoint}?lat=${provincia.lat}&lon=${provincia.lng}&lang=${this.lang}&metric=${this.metric}&appid=${this.apiKey}`
        )
        .subscribe((data: any) => {
          provincia.list = data.list;
          console.log(provincia);
        });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provincia } from 'src/models/provincia';
import provincie from '../_files/provincie.json';

@Injectable({
  providedIn: 'root',
})
export class ProvincieService {
  public ProvincieList: Provincia[] = provincie;
  endPoint = 'api.openweathermap.org/data/2.5/forecast';
  apiKey = '78a57d7ecc6983bd16fbbccefb4a1e12';
  units = 'metric';
  lang = 'it';

  constructor(private http: HttpClient) {
    this.ProvincieList = this.ProvincieList.sort((a, b) =>
      a.city > b.city ? 1 : -1
    );
    this.ProvincieList.forEach((p) => {
      p.city = p.city.replace(' ', '-');
      console.log(p.city);
    });
  }

  getIcon(provincia: any) {
    if (!provincia || !provincia.list) {
      return '03d';
    }
    return provincia?.list[0]?.weather[0]?.icon;
  }

  getDescription(provincia: any) {
    if (provincia.list) {
      return provincia?.list[0]?.weather[0].description;
    }
  }

  getTemperature(provincia: any = null, temp: number = null) {
    if (!provincia && !temp) return '-';
    let temperatura =
      provincia && provincia.list != null ? provincia.list[0].main.temp : temp;
    return Math.round(10 * temperatura) / 10 + '°';
  }

  getProvincia(provincia: string) {
    return this.ProvincieList.find((p) => p.city == provincia);
  }

  fetchData(provincia: Provincia) {
    return new Promise<Provincia>((resolve) => {
      return this.http
        .get(
          `https://${this.endPoint}?lat=${provincia.lat}&lon=${provincia.lng}&lang=${this.lang}&units=${this.units}&appid=${this.apiKey}`
        )
        .subscribe((data: any) => {
          let provinciaData = this.getProvincia(provincia.city);
          if (provinciaData) {
            provinciaData.list = data.list;
          }
          return resolve(provincia);
        });
    });
  }
}

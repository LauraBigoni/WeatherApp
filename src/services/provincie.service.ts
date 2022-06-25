import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Provincia } from 'src/models/provincia';
import provincie from '../_files/provincie.json';

@Injectable({
  providedIn: 'root',
})
export class ProvincieService {
  public ProvincieList: Provincia[] = provincie;
  endPoint = 'api.openweathermap.org/data/2.5/forecast';
  apiKey = '613360f9278a6f99821f64660a79a1b8';
  apiKey2 = 'cdb28fab678d75e57b3ae542da3e6400';
  units = 'metric';
  lang = 'it';

  @Output() public datesListEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.ProvincieList = this.ProvincieList.sort((a, b) =>
      a.city > b.city ? 1 : -1
    );
  }

  getIcon(provincia: any) {
    if (!provincia || !provincia.list) {
      return 'geolocation_disabled';
    }
    return provincia?.list[0]?.weather[0]?.icon;
  }

  getDescription(provincia: any) {
    if (provincia.list) {
      return provincia?.list[0]?.weather[0].description;
    }
  }

  getTemperature(provincia: any) {
    if (provincia.list) {
      return Math.round(10 * provincia.list[0].main.temp) / 10 + '°';
    } else return '-';
  }

  getProvincia(provincia: string) {
    return this.ProvincieList.find((p) => p.city == provincia);
  }

  fetchData(provincia: Provincia) {
    return new Promise<Provincia>((resolve) => {
      return this.http
        .get(
          `https://${this.endPoint}?lat=${provincia.lat}&lon=${provincia.lng}&lang=${this.lang}&units=${this.units}&appid=${this.apiKey2}`
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

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
  apiKey = '613360f9278a6f99821f64660a79a1b8';
  apiKey2 = 'cdb28fab678d75e57b3ae542da3e6400';
  metric = 'units';
  lang = 'it';

  constructor(private http: HttpClient) {
    this.ProvincieList = this.ProvincieList.sort((a, b) =>
      a.city > b.city ? 1 : -1
    );
  }

  getProvincia(provincia: string) {
    return this.ProvincieList.find((p) => {
      p.city == provincia;
    });
  }

  fetchData(provincia: Provincia): Promise<Provincia> {
    return new Promise((resolve) => {
      return this.http
        .get(
          `https://${this.endPoint}?lat=${provincia.lat}&lon=${provincia.lng}&lang=${this.lang}&metric=${this.metric}&appid=${this.apiKey2}`
        )
        .subscribe((data: any) => {
          provincia.list = data.list;
          console.log(provincia);
          resolve(provincia);
        });
    });
  }
}

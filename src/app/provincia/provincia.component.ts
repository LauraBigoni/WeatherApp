import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvincieService } from 'src/services/provincie.service';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
})
export class ProvinciaComponent implements OnInit {
  provincia: any;
  forecastArray: any = [];
  dates: any[];
  newArray: { key: string; value: any[] }[] = [];
  actualHour: any;
  dateFilter: string = '';

  constructor(
    public provincieService: ProvincieService,
    private route: ActivatedRoute,
    public router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getProvincia(params['city']);
    });
  }

  getHour() {
    this.actualHour = this.provincia.list[0].dt_txt;
    if (this.provincia.list) {
      return (this.actualHour = new Date());
    } else return '-';
  }

  getAllDates() {
    let dates = this.provincia.list.map((t: any) =>
      this.datepipe.transform(new Date(t.dt_txt), 'dd/MM/YYYY')
    );

    let datesFiltered = dates.filter(function (item: any, pos: any) {
      return dates.indexOf(item) == pos;
    });

    if (!this.dateFilter) {
      this.dateFilter = datesFiltered[0];
    }
    this.dates = datesFiltered;
    return datesFiltered;
  }

  getForecastArrays() {
    this.provincia.list.forEach((item: any) => {
      let date: any = new Date();
      let formatDate = item.dt_txt;
      date = this.datepipe.transform(formatDate, 'dd/MM/YYYY');

      if (this.forecastArray[date]) {
        this.forecastArray[date].push(item);
      } else {
        this.forecastArray[date] = [item];
      }
      let find = this.newArray.find((item) => item.key == date);

      if (find) {
        find.value.push(item);
      } else {
        let prova = { key: date, value: [item] };
        this.newArray.push(prova);
      }
    });

    return this.forecastArray;
  }

  getProvincia(city: string) {
    this.provincia = this.provincieService.getProvincia(city);
    if (!this.provincia.list) {
      this.provincieService.fetchData(this.provincia).then((data) => {
        this.provincia = data;
        this.getForecastArrays();
        this.getAllDates();
      });
    } else {
      this.getForecastArrays();
      this.getAllDates();
    }
  }

  getWeatherForDate() {
    return this.newArray.find((x) => x.key == this.dateFilter)?.value || [];
  }
}

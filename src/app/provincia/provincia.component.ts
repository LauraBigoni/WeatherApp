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

  private _dateFilter: string = '';

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

    this.provincieService.datesListEvent.subscribe((data) => {
      if (data && data.length > 0) {
        this.dates = data;
      }
    });

    // Two-way-bindings setto il valore
    this._dateFilter = this.forecastArray.value;
  }

  getHour() {
    if (this.provincia.list) {
      return (this.provincia.list[0].dt_txt = new Date());
    } else return '-';
  }

  getAllDates() {
    let dates = this.provincia.list.map((t: any) =>
      new Date(t.dt_txt).toLocaleDateString()
    );
    let datesFiltered = dates.filter(function (item: any, pos: any) {
      return dates.indexOf(item) == pos;
    });
    this.provincieService.datesListEvent.emit(datesFiltered);
    return datesFiltered;
  }

  getForecastArrays() {
    this.provincia.list.forEach((item: any) => {
      let date: any = new Date();
      let formatDate = item.dt_txt;
      // console.log(formatDate);
      date = this.datepipe.transform(formatDate, 'dd/MM/YYYY');
      console.log(date);

      if (this.forecastArray[date]) {
        this.forecastArray[date].push(item);
      } else {
        this.forecastArray[date] = [item];
      }
    });
    console.log(this.forecastArray);
  }

  getProvincia(city: string) {
    this.provincia = this.provincieService.getProvincia(city);
    if (!this.provincia.list) {
      this.provincieService.fetchData(this.provincia).then((data) => {
        this.provincia = data;
        this.getForecastArrays();
        this.getAllDates();
        console.log(this.forecastArray['2022/06/27']);
      });
    } else {
      this.getForecastArrays();
      this.getAllDates();
      console.log(this.provincia);
    }
  }
  // Getter e setter per leggere il valore del select
  get dateFilter(): string {
    return this._dateFilter;
  }

  set dateFilter(value: string) {
    this._dateFilter = value;
    console.log('In setter:', value);
  }
}

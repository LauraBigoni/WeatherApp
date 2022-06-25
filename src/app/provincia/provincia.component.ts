import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvincieService } from 'src/services/provincie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
})
export class ProvinciaComponent implements OnInit {
  provincia: any;
  forecastArray: any = [];
  dates: any[];

  public _dateFilter: string = '';

  constructor(
    public provincieService: ProvincieService,
    private route: ActivatedRoute,
    public router: Router
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
      let date = item.dt_txt.replace('-', '/').split(' ')[0].replace('-', '/');
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
      });
    } else {
      this.getForecastArrays();
      this.getAllDates();
      console.log(this.provincia);
    }
  }
  // Getter e setter per leggere il valore del select
  get listFilter(): string {
    return this._dateFilter;
  }

  set listFilter(value: string) {
    this._dateFilter = value;
    console.log('In setter:', value);
  }
}

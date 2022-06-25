import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvincieService } from 'src/services/provincie.service';
import { groupBy, map, mergeMap, of, toArray, reduce } from 'rxjs';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
})
export class ProvinciaComponent implements OnInit {
  provincia: any;

  constructor(
    public provincieService: ProvincieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getProvincia(params['city']);
    });
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
    let forecastArray: any = {};
    this.provincia.list.forEach((item: any) => {
      let date = item.dt_txt.replace('-', '/').split(' ')[0].replace('-', '/');
      console.log(date);
      if (forecastArray[date]) {
        forecastArray[date].push(item);
      } else {
        forecastArray[date] = [item];
      }
    });
    console.log(forecastArray);
  }

  getProvincia(city: string) {
    this.provincia = this.provincieService.getProvincia(city);
    if (!this.provincia.list) {
      this.provincieService.fetchData(this.provincia).then((data) => {
        this.provincia = data;
        this.getAllDates();
        this.getForecastArrays();
      });
    } else {
      this.getAllDates();
      console.log(this.provincia);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import provincie from '../../_files/provincie.json';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
})
export class ProvinciaComponent implements OnInit {
  city: any;
  region: any;
  lat: any;
  lng: any;

  provincia: any;

  public ProvincieList: {
    city: string;
    lat: number;
    lng: number;
    region: string;
  }[] = provincie;

  constructor(private route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this.provincia = this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.city = params.get('city');

      let provincie = this.ProvincieList;
      this.provincia = provincie.find((p) => p.city == this.city);
      console.log(this.provincia);

      this.region = this.provincia.region;
      this.lat = this.provincia.lat;
      this.lng = this.provincia.lng;
    });
  }
}

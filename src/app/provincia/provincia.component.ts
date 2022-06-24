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
  admin_name: any;
  lat: any;
  lng: any;
  product: any;

  json = 'json-file-read-angular';
  public ProvincieList: {
    city: string;
    lat: number;
    lng: number;
    admin_name: string;
  }[] = provincie;

  constructor(private route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this.product = this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.city = params.get('city');

      let products = this.ProvincieList;
      this.product = products.find((p) => p.city == this.city);
      console.log(this.product);

      this.admin_name = this.product.admin_name;
      this.lat = this.product.lat;
      this.lng = this.product.lng;
    });
  }
}

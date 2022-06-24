import { Component, OnInit } from '@angular/core';
import provincie from '../../_files/provincie.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  json = 'json-file-read-angular';
  public ProvincieList: {
    city: string;
    lat: number;
    lng: number;
    admin_name: string;
  }[] = provincie;

  constructor() {}

  ngOnInit(): void {}
}

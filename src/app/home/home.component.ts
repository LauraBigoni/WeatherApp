import { Component, OnInit } from '@angular/core';
import { ProvincieService } from 'src/services/provincie.service';
import { Provincia } from 'src/models/provincia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  provincie: Provincia[] = [];
  searchProvincia: any;

  constructor(public provincieService: ProvincieService) {
    this.provincie = this.provincieService.ProvincieList;
  }

  ngOnInit(): void {
    this.fetchProvincieData();
  }

  fetchProvincieData() {
    this.provincie.forEach((provincia) => {
      this.provincieService.fetchData(provincia);
    });

    this.provincie = this.provincieService.ProvincieList;
  }
}

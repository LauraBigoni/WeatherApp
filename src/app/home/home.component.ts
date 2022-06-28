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

  constructor(
    // Importo il service per poterlo usare in Home
    public provincieService: ProvincieService
  ) {
    // Nel costruttore inserisco i dati del servise in una variabile
    this.provincie = this.provincieService.ProvincieList;
  }

  ngOnInit(): void {
    // Richiamo la funzione che ho preparato sotto per ricevere tutte le provincie.
    this.fetchProvincieData();
  }

  // Creo una funzione la quale per ogni provincia richiama la funzione
  // 'fetchData()' dal service che mi restituisce i dati di ogni provincia
  fetchProvincieData() {
    this.provincie.forEach((provincia) => {
      this.provincieService.fetchData(provincia);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvincieService } from 'src/services/provincie.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
})
export class ProvinciaComponent implements OnInit {
  provincia: any;
  dates: any[];
  dateFilter: string = '';
  forecastArray: { key: string; value: any[] }[] = [];

  constructor(
    // Importo il service per poterlo usare nel componente
    public provincieService: ProvincieService,
    // ActivatedRoute per recuperare i params che mi arrivano dalla route
    private route: ActivatedRoute,
    // Ed il datepipe per fare un format della data
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Recupero i parametri dalla route con una subscribe
    this.route.params.subscribe((params) => {
      this.getProvincia(params['city']);
    });
  }
  // Creo una funzione per recuperare tutte le date disponibili di cui posso visualizzarne il meteo
  getAllDates() {
    // Uso map per formattare le date con il datepipe
    let dates = this.provincia.list.map((t: any) =>
      this.datepipe.transform(new Date(t.dt_txt), 'dd/MM/YYYY')
    );
    // Creo una variabile dove uso filter
    let datesFiltered = dates.filter(function (item: any, pos: any) {
      return dates.indexOf(item) == pos;
    });

    // Se non ho un valore dall'[(ngModel)] della select 'dateFIlter'
    if (!this.dateFilter) {
      // Lo imposto in modo che si visualizzi la prima data disponibile di default
      this.dateFilter = datesFiltered[0];
    }
    // La proprietà 'dates' diventa 'datesFiltered' su cui poi girerà l'*ngFor nella select
    this.dates = datesFiltered;
    // E ritorno il risultato di 'datesFiltered'
    return datesFiltered;
  }

  // Creo una funzione per recuperare tutti i dati meteo
  getForecastArrays() {
    this.provincia.list.forEach((item: any) => {
      let date: any = new Date();
      let formatDate = item.dt_txt;
      date = this.datepipe.transform(formatDate, 'dd/MM/YYYY');

      // Creo una variabile di appoggio 'find' che uso per cercare nell'array
      // Controllo se la key è uguale a date
      let find = this.forecastArray.find((item: any) => item.key == date);

      // faccio il controllo sulla key - value. Se esiste
      if (find) {
        // Pusho l'item(value) appena trovato nella key esistente
        find.value.push(item);
      } else {
        // Altrimenti creo un nuovo oggetto key-value e pusho l'item
        let found = { key: date, value: [item] };
        this.forecastArray.push(found);
      }
    });
    // Ritorno l'array completo
    return this.forecastArray;
  }

  // Creo una funzione che si aspetta un parametro per recuperare la provincia
  // A cui passo le funzioni 'getAllDates();' e 'getForecastArrays();'
  getProvincia(city: string) {
    // Chiamo il service
    this.provincia = this.provincieService.getProvincia(city);
    // Normalizzo il nome della città in caso abbia un nome doppio composto
    this.provincia.city = this.provincia.city.replace('-', ' ');

    //Se non ho list sulla provincia
    if (!this.provincia.list) {
      // Richiamo il service e la funzione 'fetchData();'
      this.provincieService.fetchData(this.provincia).then((data) => {
        this.provincia = data;
        this.getForecastArrays();
        this.getAllDates();
      });
    } else {
      // lancio le due funzioni
      this.getForecastArrays();
      this.getAllDates();
    }
  }

  // Creo una funzione per recuperare il meteo per ogni data scelta
  getWeatherForDate() {
    // Faccio un find sul forecastArray dove cerco la key.
    // Ritornerà il valore di dateFilter o altrimenti ritornerà un array vuoto.
    return (
      this.forecastArray.find((x) => x.key == this.dateFilter)?.value || []
    );
  }
}

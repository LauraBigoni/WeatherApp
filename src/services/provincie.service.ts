import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provincia } from 'src/models/provincia';
import provincie from '../_files/provincie.json';

@Injectable({
  providedIn: 'root',
})
export class ProvincieService {
  // Creo una proprietà 'provincieList' che è il modello di Provincia[Array]
  // = a 'provincie' (file json)
  public ProvincieList: Provincia[] = provincie;
  endPoint = 'api.openweathermap.org/data/2.5/forecast';
  private apiKey = '4f2b09a5b9734c1829c4eef4d5db4646';
  units = 'metric';
  lang = 'it';

  constructor(
    // Nel costruttore importo 'HttpClient' che servirà per la chiamata API
    private http: HttpClient
  ) {
    // Mostro in pagina le provincie in ordine alfabetico ascendente A-Z
    this.ProvincieList = this.ProvincieList.sort((a, b) =>
      a.city > b.city ? 1 : -1
    );

    // Normalizzo la visualizzazione dei nomi delle provincie
    // Nell'URL i nomi doppi ex. 'Ascoli Piceno' saranno visualizzati come
    // 'Ascoli-Piceno' e non 'Ascoli%20Piceno'
    this.ProvincieList.forEach((p) => {
      p.city = p.city.replace(' ', '-');
    });
  }
  // Creo una funzione per prendere l'icona meteo dell'ora attuale
  getIcon(provincia: any) {
    // Finchè la chiamata non mi restituisce qualcosa mostro un placeholder
    if (!provincia || !provincia.list) {
      return '03d';
    }
    // Appena ho i dati della chiamata mostro l'icona reale
    return provincia?.list[0]?.weather[0]?.icon;
  }

  // Creo una funzione per mostrare l'ora attuale
  getHour(provincia: any) {
    // Finchè la chiamata non mi restituisce qualcosa mostro un placeholder
    if (!provincia || !provincia.list) {
      return '-';
    }
    // Appena ho i dati della chiamata mostro la data attuale
    return (provincia.list[0].dt_txt = new Date());
  }

  // Creo una funzione per recuperare la descrizione meteo attuale
  getDescription(provincia: any) {
    // Prima controllo di avere i dati
    if (provincia.list) {
      // Appena ho i dati ritorno la descrizione
      return provincia?.list[0]?.weather[0].description;
    }
  }

  // Creo una funzione generica per recuperare la temperatura
  // La uso sia nella Home che nel componente Provincia
  getTemperature(provincia: any = null, temp: number = null) {
    // Se non ho temp E non ho provincia ritorno una stringa '-'
    if (!provincia && !temp) return '-';
    // Controllo con un ternario se ho provincia E ho la lista diverse da null
    // Se è VERO restituisco main.temp (da usare nella temp attuale)
    // Se è FALSO restituisco tutte la prop temp (da usare nel ciclo for)
    let temperatura =
      provincia && provincia.list != null ? provincia.list[0].main.temp : temp;
    // Ritorno la temperatura arrotondata al suo decimale più vicino
    return Math.round(10 * temperatura) / 10 + '°';
  }

  // Creo una funzione da usare nella chiamata API per passargli la provincia
  // Usando le coordinate geografiche
  getProvincia(provincia: string) {
    return this.ProvincieList.find((p) => p.city == provincia);
  }

  // Recupero le informazioni meteo con una subscribe
  fetchData(provincia: Provincia) {
    // Dichiaro new Promise<Provincia> per una chiamata asincrona
    return new Promise<Provincia>((resolve) => {
      return (
        this.http
          .get(
            `https://${this.endPoint}?lat=${provincia.lat}&lon=${provincia.lng}&lang=${this.lang}&units=${this.units}&appid=${this.apiKey}`
          )
          // Con subscribe faccio la chiamata e salvo data nella proprietà 'provinciaData'
          .subscribe((data: any) => {
            let provinciaData = this.getProvincia(provincia.city);
            if (provinciaData) {
              // Aggiungo alla proprietà 'list' dell'oggetto json provincie, i data dell'API
              provinciaData.list = data.list;
            }
            // Il router aspetta i data e poi fa il resolve di provincia
            return resolve(provincia);
          })
      );
    });
  }
}

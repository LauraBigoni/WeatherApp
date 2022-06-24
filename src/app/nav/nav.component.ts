import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvincieService } from 'src/services/provincie.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  dates: any[];

  constructor(
    public router: Router,
    private provincieService: ProvincieService
  ) {}

  ngOnInit(): void {
    this.provincieService.datesListEvent.subscribe((data) => {
      if (data && data.length > 0) {
        this.dates = data;
      }
    });
  }
}

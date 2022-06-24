import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProvinciaComponent } from './provincia/provincia.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'provincia/:name', component: ProvinciaComponent },

  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

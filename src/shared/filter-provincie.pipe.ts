import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProvincie',
})
export class FilterProvinciePipe implements PipeTransform {
  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }
    return items.filter(function (item: any) {
      return item.city.toLowerCase().includes(term.toLowerCase());
    });
  }
}

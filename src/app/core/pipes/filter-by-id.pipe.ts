import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.id.toLowerCase().includes(searchText);
    });
  }

}

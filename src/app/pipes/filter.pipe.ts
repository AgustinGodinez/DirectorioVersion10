import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

transform(items:any[], filterPost: string): any[] {
   
  if(!items) return [];
  if(!filterPost) return items;
  if(filterPost === '' || filterPost.length < 1) return items;
    return items.filter(item => {
      if(filterPost)
        return item.nombre?.toLowerCase().includes(filterPost.toLowerCase()) || item.responsable_directo?.toLowerCase().includes(filterPost.toLowerCase());
    });
  }
}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeUser'
})
export class PipeUserPipe implements PipeTransform {

  transform(items:any[], filterProyectos: string): any[] {
     
    if(!items) return [];
    if(!filterProyectos) return items;
    if(filterProyectos === '' || filterProyectos.length < 1) return items
      return items.filter(item => {
        if(filterProyectos)
          return item.proyecto_asignado2.toLowerCase().includes(filterProyectos.toLowerCase());
      });
    }
  }

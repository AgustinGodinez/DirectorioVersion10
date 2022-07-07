import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeUserFilter'
})
export class PipeUserFilterPipe implements PipeTransform {
  transform( value:any, arg:any): any{
    if (arg === '' || arg.length < 1) return value;
    let resultAdmin = [];
    for (const item of value) {
      if (item.nombre?.toLowerCase().indexOf(arg.toLowerCase()) > -1 || item.responsable_directo?.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultAdmin.push(item);
      };
 };
    return resultAdmin;
  }

}
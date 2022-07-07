import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeAdmin'
})
export class PipeAdminPipe implements PipeTransform {

  transform( value:any, arg:any): any{
    if (arg === '' || arg.length < 1) return value;
    let resultAdmin = [];
    for (const item of value) {
      if (
        item.nombre?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.proyecto_asignado?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.responsable_directo?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.correoCorporativo?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.telefono?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.fecha_nacimiento?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.fecha_incorporacion?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.fecha_baja?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.Nombre_familiar?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.Telefono_familiar?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.Telefono_familiar?.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || item.activo?.toLowerCase().indexOf(arg.toLowerCase()) > -1
      
      ){
        resultAdmin.push(item);
      };
 };
    return resultAdmin;
  }


}

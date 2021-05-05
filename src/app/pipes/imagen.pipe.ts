import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'hospitales'|'medicos'): string {
    
      if(!img){
          return `${ base_url }/upload/${tipo}/no-image`; 
      } else {
          return `${ base_url }/upload/${tipo}/${ img }`; 
      }
  }

}
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos(desde: number = 0){

    const url = `${base_url}/medicos?desde=${desde}`;    
    return this.http.get<CargarMedico>( url, this.headers )
      .pipe(
        map( resp => {

          const medicos = resp.medicos.map(
            medico => new Medico(medico.nombre, medico._id, medico.img )
          );
          console.log('medicos',medicos);
          return {
            total: resp.total,
            medicos
          };
        })
      )
  }

  obtenerMedicoPorId(id: string){

    const url = `${base_url}/medicos/${ id }`;    
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, medico: Medico }) => resp.medico )
      );

  }

  crearMedico(medico: { nombre: string, hospital: string }){

    const url = `${base_url}/medicos`;    
    return this.http.post( url, medico, this.headers );
  }

  actualizarMedico( medico: Medico ){

    const url = `${base_url}/medicos/${ medico._id }`;    
  
    console.log('url',url);
  
    return this.http.put( url, medico, this.headers );
  }

  eliminarMedico(medico: Medico){

    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.delete( url, this.headers );

  }
  
  guardarMedico(medico: Medico) {

    return this.http.put(`${ base_url }/medicos/${medico._id}`, medico, this.headers);
  
  }

}


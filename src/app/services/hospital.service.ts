import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { CargarHospital } from '../interfaces/cargar-hospitales.interface';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


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


  cargarHospitales(desde: number = 0){

    const url = `${base_url}/hospitales?desde=${desde}`;    
    return this.http.get<CargarHospital>( url, this.headers )
      .pipe(
        map( resp => {

          const hospitales = resp.hospitales.map(
            hospital => new Hospital( hospital.nombre, hospital._id, hospital.img )
          );
          return {
            total: resp.total,
            hospitales
          };
        })
      )
  }

  crearHospital(nombre: string){

    const url = `${base_url}/hospitales`;    
    return this.http.post( url, {nombre}, this.headers );
  }

  actualizarHospital( _id: string, nombre: string ){

    const url = `${base_url}/hospitales/${_id}`;    
    return this.http.put( url, {nombre}, this.headers );
  }

  borrarHospital( _id: string ){

    const url = `${base_url}/hospitales/${_id}`;    
    return this.http.delete( url, this.headers );
  }

}


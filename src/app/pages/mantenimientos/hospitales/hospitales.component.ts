import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})

export class HospitalesComponent implements OnInit, OnDestroy  {

  public totalHospitales: number = 0;
  public hospitales: Hospital[] = [];
  //resultados de busqueda
  public hospitalesTemp: Hospital[] = [];
  
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true; 

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService) {}
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.cargarHospitales();

      this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => {
        this.cargarHospitales();
      });
  }

  cargarHospitales(){

    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
        .subscribe( ({total, hospitales}) => {

          this.totalHospitales = total;
          this.hospitales = hospitales;
          this.hospitalesTemp = hospitales;
          this.cargando = false;
    
        })

  }

  buscar( termino: string){

    if(!termino){
      return this.hospitales = this.hospitalesTemp;
    }

    this.busquedasService.buscar('hospitales', termino)
    .subscribe( resultados => {
        this.hospitales = resultados;// as Hospital[];;
    });
  }

  guardarCambios(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
        .subscribe( resp => {

            Swal.fire('Guardado',hospital.nombre, 'success');

        });

  }

  eliminarHospital(hospital: Hospital){

    this.hospitalService.borrarHospital(hospital._id)
        .subscribe( resp => {

            this.cargarHospitales();
            Swal.fire('Borrado',hospital.nombre, 'success');

        });

  }

  async abrirSweetAlert() {

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre',
      showCancelButton: true,
    })
    
    if(value.trim().length > 0){

      this.hospitalService.crearHospital(value)
          .subscribe( (resp: any) => {

            this.hospitales.push(resp.hospital);

          })
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id, hospital.img)
  }
}

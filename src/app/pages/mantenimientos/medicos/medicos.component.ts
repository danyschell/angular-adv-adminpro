import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy  {

  public totalMedicos: number = 0;
  public medicos: Medico[] = [];
  //resultados de busqueda
  public medicosTemp: Medico[] = [];
  
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true; 

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService) {}
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.cargarMedicos();

      this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(300)
      )
      .subscribe( img => {
        this.cargarMedicos();
      });
  }

  cargarMedicos(){

    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde)
        .subscribe( ({total, medicos}) => {

          this.totalMedicos = total;
          this.medicos = medicos;
          this.medicosTemp = medicos;
          this.cargando = false;
        });

  }

  buscar( termino: string){

    if(!termino){
      return this.medicos = this.medicosTemp;
    }

    this.busquedasService.buscar('medicos', termino)
    .subscribe( resultados => {
        this.medicos = resultados;// as medico[];;
    });
  }

  guardarCambios(medico: Medico){

    this.medicoService.actualizarMedico(medico)
        .subscribe( resp => {
            Swal.fire('Guardado', medico.nombre, 'success');
        });
  }

  eliminarMedico(medico: Medico){

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta por borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si , borrar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.medicoService.eliminarMedico(medico)
          .subscribe( resp => {
            this.cargarMedicos();
            Swal.fire(
                'Medico borrado',
                `${ medico.nombre } fue eliminado correctamente`,
                'success'
            );
          });
        this.cargarMedicos();
      }
    });
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos',medico._id, medico.img)
  }

}

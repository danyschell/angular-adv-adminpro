import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: []
})

export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService : UsuarioService,
              private fileUploadService: FileUploadService) { 

    this.usuario = usuarioService.usuario;                


  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required ],
      email: [this.usuario.email, [ Validators.required, Validators.email ]],
    });
  }

  actualizarPerfil(){

      this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( () => {
        //console.log(resp);
        const {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado','Cambios guardados', 'success');
      }, ( err) => {

        //console.log(err.error.msg);
        Swal.fire('Error', err.error.msg , 'error');

      });

  }

  cambiarImagen( event ) {

    const file: File = event.target.files[0];
    this.imagenSubir = file;
    
    if(!file) {
      return this.imgTemp = null;
    } 
    
    const reader = new FileReader();
    reader.readAsDataURL( file ); 

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }
/*
p1.then(function(value) {
  console.log(value); // Success!
}, function(reason) {
  console.log(reason); // Error!
});

*/


  subirImagen(){

    this.fileUploadService
        .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
        .then( img => {
            this.usuario.img = img;
            Swal.fire('Imagen','Cambios guardados', 'success');
          })
        .catch(err => {
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        })
  }
}

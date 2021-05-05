import { environment } from "src/environments/environment"
import { Hospital } from "./hospital.model";

const base_url = environment.base_url;

interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Medico {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital
    ){}

    /*get imagenUrl() {
        // upload/usuarios/no-image
        if(!this.img){
            return `${ base_url }/upload/hospitales/no-image`; 
        } else {
            return `${ base_url }/upload/usuarios/${ this.img }`; 
        }
    }*/



}

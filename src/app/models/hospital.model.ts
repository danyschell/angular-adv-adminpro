import { environment } from "src/environments/environment"

const base_url = environment.base_url;

interface _HospitalUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Hospital {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser,
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

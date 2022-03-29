import { Usuario } from "./usuario";


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor () {

    }
    
    //Agregar un usuario
    public agregar( usuario: Usuario ) {
        
        this.lista.push( usuario );        
        return usuario;

    }

    //Actualiza un usuario
    public actualizarNombre ( id: string, nombre: string) {

        for (let usuario of this.lista) {

            if ( usuario.id  === id ){
                usuario.nombre = nombre;
                break;
            }

        }
        console.log('=========== Actualizando Lista ==============');
        console.log(this.lista)
    }

    //Obtener listar usuario
    public getLista(){
        return this.lista.filter( usuario => usuario.nombre !== 'sin nombre');
    }

    //Regregsar un usuario
    public getUsuario ( id: string ){
        return this.lista.find ( usuario => usuario.id === id );
    }

    //obtener todos los usuaruois de una sala en particula
    public getUsuariosEnSala( salaNombre: string ){
         return this.lista.filter ( usuario => usuario.sala === salaNombre )
    }

    // Borrar un usuario
    public borrarUsuario ( id: string ){
        
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter ( usuario => usuario.id !== id )        
        return tempUsuario;

    }  
        
}
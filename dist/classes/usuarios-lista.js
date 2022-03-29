"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    //Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        return usuario;
    }
    //Actualiza un usuario
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('=========== Actualizando Lista ==============');
        console.log(this.lista);
    }
    //Obtener listar usuario
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin nombre');
    }
    //Regregsar un usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    //obtener todos los usuaruois de una sala en particula
    getUsuariosEnSala(salaNombre) {
        return this.lista.filter(usuario => usuario.sala === salaNombre);
    }
    // Borrar un usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;

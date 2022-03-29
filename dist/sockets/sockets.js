"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.mapaSockets = exports.mapa = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
const mapa_1 = require("../classes/mapa");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.mapa = new mapa_1.Mapa();
// EVENTOS DE MAPA -----------------------------------------------------------------------Ñ-
const mapaSockets = (cliente, io) => {
    cliente.on('marcador-nuevo', (marcador) => {
        exports.mapa.agregarMarcador(marcador);
        //emitir a todos los clientes menos al cliente que lo envió
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', (id) => {
        exports.mapa.borrarMarcador(id);
        //emitir a todos los clientes menos al cliente que lo envió
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('marcador-mover', (marcadorActualizado) => {
        exports.mapa.moverMarcador(marcadorActualizado);
        //emitir a todos los clientes menos al cliente que lo envió
        cliente.broadcast.emit('marcador-mover', marcadorActualizado);
    });
};
exports.mapaSockets = mapaSockets;
const conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
//escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload, callback) => {
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        //Configurar usuario
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        //emitir usuario conectados
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        //Utilizoa callback
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;
//obtener usuarios
const obtenerUsuarios = (cliente, io) => {
    cliente.on('usuarios-activos', () => {
        //emitir usuario conectados
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;

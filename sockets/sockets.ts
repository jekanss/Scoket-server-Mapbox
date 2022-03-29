import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';

export const usuariosConectados = new UsuariosLista();

export const mapa = new Mapa();



// EVENTOS DE MAPA -----------------------------------------------------------------------Ñ-
export const mapaSockets = ( cliente: Socket, io: socketIO.Server ) => {

     cliente.on( 'marcador-nuevo', ( marcador: Marcador ) => {

        mapa.agregarMarcador( marcador );
        //emitir a todos los clientes menos al cliente que lo envió
        cliente.broadcast.emit( 'marcador-nuevo', marcador );

     })

     cliente.on( 'marcador-borrar', ( id: string ) => {

        mapa.borrarMarcador( id );
        //emitir a todos los clientes menos al cliente que lo envió
        cliente.broadcast.emit( 'marcador-borrar', id );

     })

     cliente.on( 'marcador-mover', ( marcadorActualizado: Marcador ) => {
        
        mapa.moverMarcador( marcadorActualizado )
        //emitir a todos los clientes menos al cliente que lo envió
        cliente.broadcast.emit( 'marcador-mover', marcadorActualizado );

     })

}

































export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    const usuario = new Usuario( cliente.id )
    usuariosConectados.agregar( usuario );    

}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {    

    cliente.on ('disconnect', () => {

        usuariosConectados.borrarUsuario(cliente.id) 
        io.emit('usuarios-activos', usuariosConectados.getLista() );

    })
}

//escuchar mensajes
export const mensaje = ( cliente: Socket,  io: socketIO.Server ) => {
    
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string }, callback ) => {
        
        io.emit('mensaje-nuevo', payload );

    })

}

export const configurarUsuario = ( cliente: Socket,  io: socketIO.Server ) => {
    
    cliente.on('configurar-usuario', ( payload :  { nombre: string } , callback: Function ) => {     
        
        //Configurar usuario
        usuariosConectados.actualizarNombre( cliente.id , payload.nombre )
        
        //emitir usuario conectados
        io.emit('usuarios-activos', usuariosConectados.getLista() );
        
        //Utilizoa callback
        callback ({
             ok: true,
             mensaje: `Usuario ${payload.nombre}, configurado`
        })
 
    })

}

//obtener usuarios


export const obtenerUsuarios = ( cliente: Socket,  io: socketIO.Server ) => {
    
    cliente.on('usuarios-activos', () => {    
        
        //emitir usuario conectados
        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista() );
 
    })

}





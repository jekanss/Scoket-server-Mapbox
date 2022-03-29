

import { Router, Request, Response } from 'express'
import { GraficaData } from '../classes/grafica';
import Server from '../classes/server';
import { usuariosConectados, mapa } from '../sockets/sockets';
import { GraficaEncuestaData } from '../classes/graficaEncuesta';

const router = Router();


router.get('/mapa', ( req: Request, res: Response ) => {

    res.json(
        mapa.getMarcadores()
    );

});




//OTRAS CLASES ------------------------------------------------------------------------------

router.get('/grafica', ( req: Request, res: Response ) => {

    res.json(
        grafica.getDataGrafica()
    );

});


const grafica = new GraficaData();
const graficaEncuesta = new GraficaEncuestaData();

//obtener datos de la grafica
router.get('/grafica', ( req: Request, res: Response ) => {

    res.json(
        grafica.getDataGrafica()
    );

});

//incrementar valores de la grafica
router.post('/grafica', ( req: Request, res: Response ) => {

    const { mes, unidades } = req.body

    grafica.incrementarValor( mes, Number( unidades ) );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica() )

    res.json(
        grafica.getDataGrafica()
    );

});

//----------------------------------------------------------------------------------------
//API's grafica Preguntas

//obtener datos de la grafica
router.get('/graficaPreguntas', ( req: Request, res: Response ) => {

    res.json(
        graficaEncuesta.getDataGraficaPreguntas()
    );

});

//incrementar valores de la grafica de preguntas
router.post('/graficaPreguntas', ( req: Request, res: Response ) => {

    const { pregunta, unidades } = req.body

    graficaEncuesta.incrementarValorPregunta( pregunta, Number( unidades ) );

    const server = Server.instance;
    server.io.emit('cambio-graficaEncuesta', graficaEncuesta.getDataGraficaPreguntas() )

    res.json(
        graficaEncuesta.getDataGraficaPreguntas()
    );

});


router.get('/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mesg: 'Todo está bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response ) => {

    const { cuerpo, de } = req.body

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload )

    res.json({
        ok: true,
        cuerpo,
        de,        
    });

})

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    const { cuerpo, de } = req.body
    const id = req.params.id

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;
    server.io.in( id ).emit('mensaje-privado', payload )

    res.json({
        ok: true,
        cuerpo,
        de,  
        id      
    });

})

//Servicio para obtener todos los ids de los usuarios conectados
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;
    
    //Obtener todos los usuarios
    server.io.allSockets().then(( clientes )=>{      
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });

})

//Obtener usuarios y sus nombres

router.get('/usuarios/detalle', ( req: Request, res: Response ) => {   
    
    res.json({
        ok:false,
        clientes:  usuariosConectados.getLista()
    })
   

})


export default router
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grafica_1 = require("../classes/grafica");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
const graficaEncuesta_1 = require("../classes/graficaEncuesta");
const router = (0, express_1.Router)();
router.get('/mapa', (req, res) => {
    res.json(sockets_1.mapa.getMarcadores());
});
//OTRAS CLASES ------------------------------------------------------------------------------
router.get('/grafica', (req, res) => {
    res.json(grafica.getDataGrafica());
});
const grafica = new grafica_1.GraficaData();
const graficaEncuesta = new graficaEncuesta_1.GraficaEncuestaData();
//obtener datos de la grafica
router.get('/grafica', (req, res) => {
    res.json(grafica.getDataGrafica());
});
//incrementar valores de la grafica
router.post('/grafica', (req, res) => {
    const { mes, unidades } = req.body;
    grafica.incrementarValor(mes, Number(unidades));
    const server = server_1.default.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());
});
//----------------------------------------------------------------------------------------
//API's grafica Preguntas
//obtener datos de la grafica
router.get('/graficaPreguntas', (req, res) => {
    res.json(graficaEncuesta.getDataGraficaPreguntas());
});
//incrementar valores de la grafica de preguntas
router.post('/graficaPreguntas', (req, res) => {
    const { pregunta, unidades } = req.body;
    graficaEncuesta.incrementarValorPregunta(pregunta, Number(unidades));
    const server = server_1.default.instance;
    server.io.emit('cambio-graficaEncuesta', graficaEncuesta.getDataGraficaPreguntas());
    res.json(graficaEncuesta.getDataGraficaPreguntas());
});
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mesg: 'Todo está bien!!'
    });
});
router.post('/mensajes', (req, res) => {
    const { cuerpo, de } = req.body;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
    });
});
router.post('/mensajes/:id', (req, res) => {
    const { cuerpo, de } = req.body;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
//Servicio para obtener todos los ids de los usuarios conectados
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    //Obtener todos los usuarios
    server.io.allSockets().then((clientes) => {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: false,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
exports.default = router;

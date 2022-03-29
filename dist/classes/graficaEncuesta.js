"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficaEncuestaData = void 0;
class GraficaEncuestaData {
    constructor() {
        this.preguntas = ['pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4'];
        this.valores = [0, 0, 0, 0];
    }
    getDataGraficaPreguntas() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ];
    }
    incrementarValorPregunta(pregunta, valor) {
        pregunta = pregunta.toLowerCase().trim();
        for (let i in this.preguntas) {
            if (this.preguntas[i] === pregunta) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGraficaPreguntas();
    }
}
exports.GraficaEncuestaData = GraficaEncuestaData;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficaData = void 0;
class GraficaData {
    constructor() {
        this.meses = ['enero', 'febrero', 'marzo', 'abril'];
        this.valores = [1, 2, 3, 4];
    }
    getDataGrafica() {
        return [
            { data: this.valores, label: 'Ventas' }
        ];
    }
    incrementarValor(mes, valor) {
        mes = mes.toLowerCase().trim();
        for (let i in this.meses) {
            if (this.meses[i] === mes) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGrafica();
    }
}
exports.GraficaData = GraficaData;

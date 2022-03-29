
export class GraficaEncuestaData {

    private preguntas: string[] = [ 'pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4' ];
    private valores: number[] = [ 0,0,0,0 ];
    
    constructor(){
    
    }

    getDataGraficaPreguntas(){

        return [
            { data: this.valores , label: 'Preguntas' }
        ]

    }

    incrementarValorPregunta ( pregunta: string, valor: number ){
    
        pregunta = pregunta.toLowerCase().trim();

        for ( let i in this.preguntas ) {

            if ( this.preguntas[i] === pregunta ){                
                this.valores[i] += valor;
            }

        }

        return this.getDataGraficaPreguntas();

    }

}
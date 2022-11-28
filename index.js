const btnNumero = document.querySelectorAll('[data-numero]'); 
const btnOperador = document.querySelectorAll('[data-operador]');
const btnIgual = document.querySelector('[data-igual]');
const ac = document.querySelector('[data-borrar-todo]');
const del = document.querySelector('[data-borrar]');
const textoValorSuperior = document.querySelector('[data-valor-superior]');
const textoValorInferior = document.querySelector('[data-valor-inferior]');

class Calculadora {
    constructor (valorSuperior, valorInferior){
        this.textoValorInferior = valorInferior
        this.textoValorSuperior = valorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }

    agregarNumero(numero){
        if(numero === '.' && this.valorInferior.includes ('.'))
        return
        this.valorInferior = this.valorInferior + numero
    }

    imprimirDisplay(){
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }

    borrar(){
        this.valorInferior = this.valorInferior.slice(0,-1)
    }

    elegirOperacion(operador){
        if(this.valorInferior == '') 
        return
        if(this.valorSuperior != '') {
            this.realizarCalculo()
        }
        this.operador = operador
        this.valorSuperior = this.valorInferior
        this.valorInferior = ''
    }

    realizarCalculo(){
        let resultado;
        let conversionValorSuperior = parseFloat(this.valorSuperior);
        let conversionValorInferior = parseFloat(this.valorInferior);
        if(isNaN (conversionValorSuperior) || isNaN (conversionValorInferior)) 
        return
        switch (this.operador) {
            case '+': resultado = conversionValorSuperior + conversionValorInferior;
            break
            case '-': resultado = conversionValorSuperior - conversionValorInferior;
            break
            case '*': resultado = conversionValorSuperior * conversionValorInferior;
            break
            case '/': resultado = conversionValorSuperior / conversionValorInferior;
            break
        }
            this.valorInferior = resultado
        this.operador = undefined
        this.valorSuperior = ''
    }

    limpiarPantalla() {
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }

}

const calculadora = new Calculadora (textoValorSuperior, textoValorInferior)

btnNumero.forEach(boton => {
    boton.addEventListener('click', () =>{
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

del.addEventListener('click',() => {
    calculadora.borrar()
    calculadora.imprimirDisplay()
})

btnOperador.forEach(boton => {
    boton.addEventListener('click', () =>{
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay()
    })
})

btnIgual.addEventListener('click',() => {
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
})

ac.addEventListener('click',() => {
    calculadora.limpiarPantalla()
    calculadora.imprimirDisplay()
})
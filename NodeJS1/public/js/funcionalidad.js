let numeroPantalla = '0';

let pantallaNumero = 'si';

//var punto;

var espera = 0;

let solucion = '';



function obtener(num) {

    document.getElementById('entrada').value += num;

}



function calcular() {

    let valor = document.getElementById('entrada').value;

    let total = parseFloat(valor);

    document.getElementById('entrada').value = total;

    alert('Resultado obtenido');

}



function sumar(val) {

    alert('sumar');

}



function restar(val) {

    alert('restar');

}



function multiplicar(val) {

    alert('multiplicar');

}



function dividir(val) {

    alert('dividir');

}



function potenciar(val) {

    alert('potenciar');

}

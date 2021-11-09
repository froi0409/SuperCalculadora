var entrada_1 = document.getElementById("entrada_1");
var entrada_2 = document.getElementById("entrada_2");
var resultado = document.getElementById("resultado");

function resolver(operacion){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'http://localhost:5000/api/operacion',
        data: {
            entrada_1: entrada_1.value,
            entrada_2: entrada_2.value,
            operacion: operacion
        },
        success: function(data){
            //Actualizamos el valor del input
            resultado.value = data.resultado;
        }
    });
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'http://localhost:5000/worker/operacion',
        data: {
            entrada_1: entrada_1.value,
            entrada_2: entrada_2.value,
            operacion: operacion
        },
        success: function(data){
            //Actualizamos el valor del input
            resultado.value = data.resultado;
        }
    });

}
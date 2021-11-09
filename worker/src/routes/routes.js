const express = require('express');
const router = express.Router();

/*router.get('/operacion', (req, res) => {
    let entrada = req.query.entrada;
    let resultado = req.query.entrada;

    //Recibes valores y variables
    //const entrada = req.query.nombre1;

    const return_json = {
        entrada  : entrada,
        resultado : resultado
    };

    addFilaHistorial(`historial`, `${entrada}=${resultado}`).then((data) => {
        console.log('Se pudo registrar');
        res.status(201).json(return_json);
    }).catch((error) => {
        console.log('error al registrar: ' + error);
        res.status(201).json(return_json);
    });

});*/

router.get('/obtenerhistorial', (req, res) => {
    //Recibes valores y variables
    //const entrada = req.query.nombre1;

    getRegistrosHistorial(`historial`).then((data) => {
        //let datosJSON = JSON.parse(data);
        console.log('Datos: '+ data);
        res.status(201).json({data});
    }).catch((error) => {
        res.status(201).json({});
    });

});

async function getRegistrosHistorial(){
    return new Promise((resolve, reject) => {
        redisCli.lrange('historial', 0, -1, async (error, data) => {
            if(error) return reject(error);//rechazamos por error
            if(data != null){//existe la informacion   
                resolve(data);
            }
            reject(error);           
        });

    })
}

async function addFilaHistorial(key, value){
    return new Promise((resolve, reject) => {
        redisCli.lpush(key, value, async (error, data) => {
            if(error) return reject(error);//rechazamos por error
            //if(data != null){//existe la informacion   
                resolve("true");
            //}
           
        });

    })
}





module.exports = router;

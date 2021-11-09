const express = require('express');
const Redis = require('redis');
const router = express.Router();

const redisCli = Redis.createClient(process.env.REDIS_URL);

router.get('/operacion', (req, res) => {
    const entrada_1 = req.query.entrada_1;
    const entrada_2 = req.query.entrada_2;
    const operacion = req.query.operacion;

    let resultado;
    switch(operacion){
        case "suma":
                resultado = entrada_1 + "*" + entrada_2;
            break;
        case "resta":
                resultado = entrada_1 + "-" + entrada_2;
            break;
        case "multiplicacion":
                resultado = entrada_1 + "*" + entrada_2;
            break;
        case "division":
                resultado = entrada_1 + "/" + entrada_2;
            break;
    }

    addFilaHistorial(`historial`, {
        'entrada ' : entrada_1 + operacion + entrada_2,
        'resultado': eval(resultado)}).then((data) => {
        res.status(201).json( {
            'entrada ' : entrada_1 + operacion + entrada_2,
            'resultado': eval(resultado)});
    }).catch(() => {
        res.status(201).json( {
            'entrada ' : entrada_1 + operacion + entrada_2,
            'resultado': "se produojo un error"});
    }); 

    res.status(201).json({resultado : eval(resultado)});
});

router.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    
    getKey(`${username}`, password).then((data) => {
        //Credenciales correctas        
          
        console.log({estado : data});
        res.status(201).json({estado : data});
        //res.status(201).json({estado : data});
    }).catch(() => {
        console.log({estado : false});
        res.status(201).json({estado : false});
    });
});

router.get('/registrar', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
 
    setKey(`${username}`, password).then((data) => {
        res.status(201).json({estado : data});
    }).catch((error) => {
        res.status(201).json({estado : "se produjo un error" + error});
    });       
});

async function setKey(key, value){
    return new Promise((resolve, reject) => {
        redisCli.set(key, async (error, data) => {
            if(error) return reject(error);
            if(data != null){
                resolve("usuario repetido");
            }
            redisCli.set(key, value);
            resolve("El usuario se registro");
        });
    })
}

async function getKey(key, value){
    return new Promise((resolve, reject) => {
        redisCli.set(key, value, async (error, data) => {
            if(error) return reject(error);
            if(data != null){
                resolve("usuario repetido");
            }
            redisCli.set(key, value);
            resolve("El usuario se registro");
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
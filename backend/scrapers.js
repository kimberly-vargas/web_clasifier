const {Worker} = require('worker_threads')
const os = require('os')
const _ = require('lodash');


const scrapeUrl = async (urls) => { 
    var datos = []

    //Se dividen las urls para enviar chunks de tamaños iguales a cada cpu del ordenador
    const cpus = os.cpus().length - 1
    let chunckedTasks = _.chunk(urls, Math.ceil(urls.length/cpus))

    //Primer nivel de concurrencia: se crean los hijos y se ejecutan de forma paralela
    chunckedTasks = chunckedTasks.map((chunk) => new Promise((resolve, reject) => {
        try{
            const worker = new Worker('./worker.js')
            worker.postMessage(chunk)
            worker.on('message', result => {
                datos = [...datos, ...result]
                resolve()
            })
        } catch {
            console.log(Error)
            reject()
        }
    }))

    await Promise.all(chunckedTasks)
    console.log('Scraping listo!')
    return datos
}

module.exports = {
    scrapeUrl
}
 























































































/* var semaforos = [false, false, false, false]
    var datos = []

    let mitad = Math.floor(urls.length / 2);
    let inicio = urls.slice(0, mitad);
    let final = urls.slice(mitad); // si no se indica el índice final, se usa la longitud del array como referencia

    mitad = Math.floor(inicio.length / 2)
    let inicio1 = inicio.slice(0, mitad);
    let inicio2 = inicio.slice(mitad);

    mitad = Math.floor(final.length / 2)
    let final1 = final.slice(0, mitad);
    let final2 = final.slice(mitad);

    //hilo1
    worker.postMessage(inicio1)
    worker.on('message', data => {
        datos = [...datos, ...data]
        semaforos[0] = true
    })

    //hilo2
    worker.postMessage(inicio2)
    worker.on('message2', data => {
        datos = [...datos, ...data]
        semaforos[1] = true
    })

    //hilo3
    worker.postMessage(final1)
    worker.on('message3', data => {
        datos = [...datos, ...data]
        semaforos[2] = true
    })

    //hilo4
    worker.postMessage(final2)
    worker.on('message4', data => {
        datos = [...datos, ...data]
        semaforos[3] = true
    })
    
    console.log('datos: ', datos)
    return datos */
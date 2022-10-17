const puppeteer = require('puppeteer')
const {Worker} = require('worker_threads')
const os = require('os')
const _ = require('lodash');
const { nextTick } = require('process');
//const worker = new Worker('./worker.js')

let urls =['https://www.thewhitecompany.com',
    'https://www.clothingshoponline.com',
    'https://www.nordstrom.com/browse/women/clothing',
    'https://www.asos.com/us',
    'https://www.showpo.com',
    'https://www.prettylittlething.us',
    'https://thevou.com/fashion/online',
    'https://www.thrifted.com',
    'https://www.shopjustice.com',
    'https://japanese-clothing.com',
    'https://gothicy.com',
    'https://www.dealbyethan.com',
    'https://www.made-in-china.com/Supplier/Manufacturer',
    'https://www.thewhitecompany.com',
    'https://www.thewhitecompany.com',
    'https://www.clothingshoponline.com',
    'https://www.nordstrom.com/browse/women/clothing',
    'https://www.asos.com/us',
    'https://www.showpo.com',
    'https://www.prettylittlething.us',
    'https://thevou.com/fashion/online',
    'https://www.thrifted.com',
    'https://www.shopjustice.com',
    'https://japanese-clothing.com',
    'https://gothicy.com',
    'https://www.dealbyethan.com',
    'https://www.made-in-china.com/Supplier/Manufacturer',
    'https://www.thewhitecompany.com',
    'https://www.thewhitecompany.com'];


const scrapeUrl = async () => {
    var datos = []
    const cpus = os.cpus().length - 1
    
    let chunckedTasks = _.chunk(urls, Math.ceil(urls.length/cpus))

    chunckedTasks = chunckedTasks.map((chunk) => new Promise((resolve, reject) => {
        console.log(chunk)
        const worker = new Worker('./worker.js')
        worker.postMessage(chunk)
        worker.on('message', result => {
            datos = [...datos, ...result]
            resolve()
        })
    }))

    await Promise.all(chunckedTasks)
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
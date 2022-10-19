const {parentPort} = require('worker_threads')
const {Worker} = require('worker_threads')
const _ = require('lodash');


const scrapedData = async (chunk) => {
    let scrapedText = []
    console.log('divido este chunk ', chunk)

    //Segundo nivel de concurrencia: se divide el chunk de cada cpu en tres partes para ejecutar en hilos aparte 
    //el scraping de la web
    let chunckedTasks = _.chunk(chunk, Math.ceil(chunk.length/3))

    chunckedTasks = chunckedTasks.map((lista) => new Promise((resolve, reject) => {
        const worker = new Worker('./worker2.js')
        worker.postMessage(lista)
        worker.on('message', result => {
            scrapedText = [...scrapedText, ...result]
            resolve()
        })
    }))

    await Promise.all(chunckedTasks)
    console.log('se termino el trabajo de los hilos')
    return scrapedText
}

parentPort.on('message', async chunk => {
    parentPort.postMessage(await scrapedData(chunk))
})
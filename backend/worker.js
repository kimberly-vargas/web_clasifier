const {parentPort, isMainThread} = require('worker_threads')
const puppeteer = require('puppeteer')


const scrapeUrl = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const tags = ['a', 'p', 'h1', 'h2', 'h3']
    let palabras = []

    for (let i in tags){
        try {
            await page.waitForSelector(tags[i])
        } catch {
            continue
        }
        const palabrasEncontradas = await page.$$eval(tags[i], el => el.map(item => item.textContent))
        palabras = [...palabras, ...palabrasEncontradas]
    }
    browser.close()
    return palabras
}

const scrapedData = async (chunk) => {
    console.log('ejecutando')
    let scrapedText = []
    urls = chunk
    for (let i in urls){
        const palabras = {
            url: urls[i],
            palabras: await scrapeUrl(urls[i])
        }
        scrapedText.push(palabras)
    }
    return scrapedText
}

parentPort.on('message', async chunk => {
    parentPort.postMessage(await scrapedData(chunk))
})

/* if (!isMainThread){
    const palabras = await scrapedData()
    parentPort.postMessage(palabras)
}
 */




































































































































































/* parentPort.on('message', async data => {
    console.log('ejecutando')
    let scrapedData = []
    urls = data
    for (let i in urls){
        const palabras = {
            url: urls[i],
            palabras: await scrapeUrl(urls[i])
        }
        scrapedData.push(palabras)
    }
    parentPort.postMessage(scrapedData)
})
 */


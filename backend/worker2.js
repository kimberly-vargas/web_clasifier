const {parentPort} = require('worker_threads')
const puppeteer = require('puppeteer')

const scrapeUrl = async (url) => {
    //scraping para obtener las palabras de cada web
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(0); 
    await page.goto(url)
    
    console.log('entro al scrapeUrl')

    const tags = ['a', 'p', 'h1', 'h2', 'h3']
    let palabras = []

    for (let i in tags){
        try {
            await page.waitForSelector(tags[i])
        } catch {
            continue
        }
        const palabrasEncontradas = await page.$$eval(tags[i], el => el.map(item => item.textContent.trim()))
        palabras = [...palabras, ...palabrasEncontradas]
    }

    browser.close()
    return palabras
}

const scrapedData = async (chunk) => {
    console.log('ejecutando ', chunk)
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

parentPort.on('message', async urls => {
    parentPort.postMessage(await scrapedData(urls))
})
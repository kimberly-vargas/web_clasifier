const express = require('express')
const cors = require('cors')
const scrapers = require('./scrapers');
const bayes = require('./bayes');
const app = express()

const port = 3001
app.use(cors())
app.use(express.json())

let urls =[
    'https://www.bestbuy.com',
    'https://store.epicgames.com',
    'https://store.epicgames.com',
    'https://rubysrasoi.com.au',
    'https://play.google.com',
    'https://www.gamestop.com',
    'https://www.razer.com',
    'https://www.nintendo.com',
    'https://reviewae.com',
    'https://www.smythstoys.com',
    'https://www.tripadvisor.com',
    'https://www.yoox.com',
    'https://www.rue21.com',
    'https://www.selfridges.com',
    'https://www.monki.com',
    'https://www.torrid.com',
    'https://www.anthropologie.com',
    'https://www.kohls.com',
    'https://www.showpo.com',
    'https://www.instyle.com',
    'https://www.lulus.com',
    'https://www.bigcommerce.com'
    ];

let scrapedData = []

const scrapingData = async () => {
    const data = await scrapers.scrapeUrl(urls)
    //Ejecutar Bayes
    console.log('Inicia Bayes')
    const urlsClasificadas = await bayes.obtenerProbTotales(data)
    scrapedData = urlsClasificadas
}
scrapingData()

app.get('/urls', (req, res) => {
    res.json(scrapedData)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
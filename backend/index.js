const express = require('express')
const cors = require('cors')
const scrapers = require('./scrapers');
const bayes = require('./bayes');
const app = express()

const port = 3001
app.use(cors())
app.use(express.json())

let scrapedData = []

app.get('/urls', (req, res) => {
    //Carga en el backend la lista de cada web con sus clasificaciones
    res.json(scrapedData)
})

app.post('/urls', async (req, res) => {
    //Hacer el scraping y guardar los datos
    const data = await scrapers.scrapeUrl(req.body)
    //Ejecutar Bayes
    console.log('bayes')
    const urlsClasificadas = await bayes.obtenerProbTotales(data)
    scrapedData = urlsClasificadas
    res.json('succes')
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const cors = require('cors')
const scrapers = require('./scrapers');
const app = express()

const port = 3001
app.use(cors())
app.use(express.json())

let scrapedData = []

// respond with "hello world" when a GET request is made to the homepage
app.get('/urls', (req, res) => {
    //Obtener de la BD las urls para el scraping
    res.json(JSON.stringify(scrapedData))
})


app.post('/urls', async (req, res) => {
    //3 hacer el scraping y escribir los datos en una BD
    const data = await scrapers.scrapeUrl()
    //console.log(data)
    scrapedData = data
    res.json('succes')
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
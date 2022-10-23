let palabrasC1 = []
let palabrasC2 = []
let cantPalabrasC1 = 0
let cantPalabrasC2 = 0
let totalPalabras = 0
let incidenciasC1 = 0
let incidenciasC2 = 0
let categoriaFinal = ""
let incidenciaFinal = 0

function obtenerPalabrasC1() {
    return new Promise(async resolve => {
      require("fs").readFile("./DB/DatasetClothes.txt", "utf8", (err, data) => {
        resolve(data.split("\r\n"))})
    });
}

function obtenerPalabrasC2() {
    return new Promise(async resolve => {
      require("fs").readFile("./DB/DatasetTech.txt", "utf8", (err, data) => {
        resolve(data.split("\r\n"))})
    });
}
  
async function cargarDatos() {
    console.log('calling');
    palabrasC1 = await obtenerPalabrasC1();
    palabrasC2 = await obtenerPalabrasC2();
    cantPalabrasC1 = palabrasC1.length
    cantPalabrasC2 = palabrasC2.length
    totalPalabras = cantPalabrasC1 + cantPalabrasC2
    console.log(totalPalabras)
}



const calcCantPalabrasXCat = (palabrasUrl) => {
    incidenciasC1 = 0
    incidenciasC2 = 0
    const datasetBloqueo = ['cannot access', 'denied', 'unusual activity']

    for (let p in palabrasUrl){
        for (let b in datasetBloqueo){
            if(palabrasUrl[p].toLowerCase().includes(datasetBloqueo[b].toLowerCase())){
                return {incidenciasC1: 0, incidenciasC2: 0, bloqueo: true}
            }
        }

        for (let c1 in palabrasC1){
            if(palabrasUrl[p].toLowerCase().includes(palabrasC1[c1].toLowerCase())){
                incidenciasC1 = incidenciasC1 + 1
            }
        }

        for (let c2 in palabrasC2) {
            if(palabrasUrl[p].toLowerCase().includes(palabrasC2[c2].toLowerCase())){
                incidenciasC2 = incidenciasC2 + 1
            }
        }
    }

    console.log('incidenciasC1 ', incidenciasC1)
    console.log('incidenciasC2 ',incidenciasC2)
    return {incidenciasC1: incidenciasC1, incidenciasC2: incidenciasC2, bloqueo: false}
}

const obtenerProbTotales = async (scrapedData) => {
    await cargarDatos();
    console.log('datos guardados')
    scrapedData.map((webData, index) => {
        console.log('entro al map ', webData.url)
        //ProbabilidadPrevia
        const probPrevCat1 = cantPalabrasC1/totalPalabras
        const probPrevCat2 = cantPalabrasC2/totalPalabras

        //Calcular cantidad de palabras por categoria
        
        const {incidenciasC1, incidenciasC2, bloqueo} = calcCantPalabrasXCat(webData.palabras)

        //Probabilidad incidencias
        const probInCat1 = incidenciasC1/cantPalabrasC1
        const probInCat2 = incidenciasC2/cantPalabrasC2

        //ProbabilidadTotal
        const probTotalC1 = probPrevCat1 * probInCat1
        const probTotalC2 = probPrevCat2 * probInCat2
        
        if (bloqueo) {
            scrapedData[index] = {...scrapedData[index], categoria: "Sin categoría", probTotal: 0, bloqueo: bloqueo, incidencia: 0}
        }else{
            if(probTotalC1 > probTotalC2){ //ropa
                scrapedData[index] = {...scrapedData[index], categoria: "Clothes", probTotal: probTotalC1, bloqueo: bloqueo, incidencia: incidenciasC1}
            }
            else{//tech
                scrapedData[index] = {...scrapedData[index], categoria: "Tech", probTotal: probTotalC2, bloqueo: bloqueo, incidencia: incidenciasC2}
            }
        }
    })

    return scrapedData
}


module.exports = {
    obtenerProbTotales
} 


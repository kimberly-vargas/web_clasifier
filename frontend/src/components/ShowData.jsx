import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from 'recharts';
import { TopUrls } from "./TopUrls"
import Button from '@mui/material/Button';


const ShowData = () => {
    const [data, setData] = useState([])
    const [top, setTop] = useState([])
    const [bandera, setBandera] = useState(false)

    const peticion = async () => {
        const res = await fetch(`http://localhost:3001/urls`)
        const datos = await res.json()
        setData([{ name: "Bloqueos", cantidad: datos.filter(el => el.bloqueo).length },
        { name: "Vestimenta", cantidad: datos.filter(el => el.categoria === "Clothes").length },
        { name: "Tecnología", cantidad: datos.filter(el => el.categoria === "Tech").length },
        { name: "Sin categoría", cantidad: datos.filter(el => el.categoria === "Sin categoría").length }])
        setTop(datos)
        console.log(datos[0].concidencias)
    }

    //Al cargar la app se ejecuta automaticamente el scraping
    useEffect(() => {
        peticion()
    }, [])

    // const calculateTop = () => {
    //     data.map(url => list.push({titulo: url.tituo, category: url.probTotalC1 + url.probTotalC2 !== 0 ? url.probTotalC1 > url.probTotalC2 ? "Clothes" : "Tech" : "No Category" , total: url.probTotalC1 + url.probTotalC2, url: url.url, totalWords: url.palabras.length}))
    //     const sorted = list.sort((a, b) => a.total - b.total)
    //     return sorted.reverse()
    // }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Gráficas</h1>
            <div style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="cantidad"
                        data={data}
                        cx={200}
                        cy={200}
                        outerRadius={130}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>


                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="cantidad" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>

            </div>
            <h1 style={{ textAlign: "center" }}>Páginas con los mejores resultados</h1>
            <TopUrls top={top} bandera={bandera}/>


            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px"}}>
            <Button onClick={()=>setBandera(!bandera)} variant="outlined">{!bandera?"Mostrar todos los resultados":"Mostrar Top 5"}</Button>
            </div>
            
        </div>
    )
}

export { ShowData }
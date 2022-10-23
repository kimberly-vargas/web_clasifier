import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from 'recharts';
import {TopUrls} from "./TopUrls"

const ShowData = () => {
    const [data, setData] = useState([])
    const [top, setTop] = useState([])

    //C1 Ropa
    //C2 Tech

    const peticion = async () => {
        const res = await fetch(`http://localhost:3001/urls`)
        const datos = await res.json()
        setData([{ name: "Bloqueos", cantidad: datos.filter(el => el.bloqueo).length },
        { name: "Vestimenta", cantidad: datos.filter(el => el.categoria === "Clothes").length },
        { name: "Tecnología", cantidad: datos.filter(el => el.categoria === "Tech").length }])
        setTop(datos)
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
            <h1 style={{textAlign: "center"}}>Gráficas</h1>
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
                        outerRadius={80}
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
            <h1 style={{textAlign: "center"}}>Páginas con los mejores resultados</h1>
            <TopUrls top={top}/>
        </div>
    )
}

export { ShowData }
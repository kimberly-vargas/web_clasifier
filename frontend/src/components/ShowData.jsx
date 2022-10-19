import React, { useEffect, useState } from 'react'
import { Loading } from '../assets/Loading.js'

let urls =[
'https://www.asos.com',
'https://www.nordstrom.com',
'https://www.macys.com',
'https://www.boohoo.com',
'https://www.fashionnova.com',
'https://www.myntra.com',
'https://www.clothingshoponline.com',
'https://www.nastygal.com',
'https://www.next.co.uk',
'https://www.theiconic.com.au',
'https://www2.hm.com',
'https://www.forever21.com',
'https://www.thebudgetfashionista.com',
'https://www.revolve.com',
'https://www.na-kd.com',
'https://www.nykaafashion.com',
'https://www.farfetch.com',
'https://www.uniqlo.com',
'https://www.express.com',
'https://www.matalan.co.uk',
'https://oldnavy.gap.com',
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
'https://www.bigcommerce.com',
'https://www.riverisland.com',
'https://www.buzzfeed.com',
'https://superbalist.com',
'https://thevou.com',
'https://www.loft.com',
'https://www.zalora.com.ph',
'https://www.comma-store.eu',
'https://www.windsorstore.com',
'https://www.zando.co.za',
'https://www.hottopic.com',
'https://www.only.com/es-es',
'https://www.shein.co.uk',
'https://www.limeroad.com',
'https://www.reitmans.com',
'https://www.zalando.co.uk',
'https://oldnavy.gapcanada.ca',
'https://www.laredoute.com',
'https://www.rivafashion.com',
'https://www.desigual.com',
'https://www.urbanoutfitters.com',
'https://www.net-a-porter.com',
'https://www.freepeople.com',
'https://www.thefix.co.za',
'https://www.stitchfix.com'
];

const ShowData = () => {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)

    const scrape = async () => {
        setLoading(true)
        //Peticion al backend para ejecutar el scraping y el analisis de bayes      
        await fetch('http://localhost:3001/urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urls)
        })

        //Traer los datos obtenidos del scraping e imprimirlo en el frontend
        await fetch('http://localhost:3001/urls').then(
            res => res.json())
        .then(
            datos => {
                setData(datos)
                console.log(datos)
            }
        )
        setLoading(false)
    }

    //Al cargar la app se ejecuta automaticamente el scraping
    useEffect(() => {
        scrape()
    }, []) 

  return (
    <div>
        <h1>Web clasifier</h1>
        <br/>
        {
            loading && <div>
                <Loading/>
                <h5>Realizando análisis</h5>
            </div> 
        }
    </div>
  )
}

export {ShowData}
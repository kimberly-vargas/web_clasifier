import React, { useEffect, useState } from 'react'

const ShowData = () => {
    const [data, setData] = useState('')

    /* const loadData = async () => {
        //2 Consumir las URLs en el fronted 
        fetch('http://localhost:3001/urls').then(
            res => res.json()
        ).then(
            urls => {
                setData(urls)
                console.log(urls)
            }
        ) 
    } */

    const scrape = async () => {
        const url = {name: 'pagina2', url: 'https://karamawicr.com/'}
        
        await fetch('http://localhost:3001/urls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(url)
        })

        await fetch('http://localhost:3001/urls').then(
            res => res.json())
        .then(
            data => {
                console.log(data)
            }
        )
    }

    useEffect(() => {
        //loadData()
        //scrape()
    }, []) 

  return (
    <div>

    </div>
  )
}

export {ShowData}
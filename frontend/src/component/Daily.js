import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import Droplet from '../asset/waterdrop.gif'
import Loading from '../component/loading/Loading'

const Daily = () => {
const[title,SetTitle] = useState('')
const[card,SetCard] = useState([])
const[loading,SetLoading] = useState(true)
    useEffect(()=>{
            axios.get('http://localhost:8000/dailyweather')
                .then(response => {
                    const data = response.data
                    SetTitle(data[0].title)
                    const details =data.map(a =>{
                        if(a.days !== undefined){
                        return(
                            <div key={a.date} className='daily-weather-card'>
                                <h5>{a.date}</h5>
                                <h4 style={{width:'10%',margin:'20px'}}>{a.days} </h4>
                              
                               
                               
                                <img src={a.image} style={{width:'50px'}}/>
                                <h2 style={{width:'20%', fontSize:'3.125rem'}}>{a.htemp}<span style={{fontSize:'0.938rem',color:'grey'}}>/{a.ltemp}</span></h2>
                                <p style={{width:'40%',fontSize:'1.25rem'}}>{a.phrase}</p>
                                <span style={{margin:'10px'}}><img src={Droplet} alt='no image'/>{a.raindroppercentage}</span>
                               

                            </div>
                        )}
                   
                    })
                    SetLoading(false)
                    SetCard(details)
                })
               
        },[])
    
    return loading ?(<Loading />):(
        <div>
    <h1 className='header'>{title}</h1> 
        {card}
        </div>
 
 )
}

export default Daily

import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import Loading from './loading/Loading'


const Hourly = () => {
const[loading,SetLoading] = useState(true)
 const [Card, setCard] = useState('') 


    useEffect(()=>{
            axios.get('http://localhost:8000/hourlyweather')
                .then(response =>{
                    const data = response.data
                    const fetchdata = data.map((a)=>{
        
                      return(
                          <div id='hourly-container' key={a.time}>
                    <div className='date-time-box'>
                      <span style={{fontWeight:'bolder'}}>{a.date}</span>
                          <br />
                     <span>{a.time}</span>
                   </div>
                   <div id='celcius-box'>
                        <span style={{fontWeight:'bolder',fontSize:'30px'}}> 
                        <img src={a.image} alt='no image' style={{width:'50px'}}/>{a.temp}
                        <span style={{fontSize:'15px'}}>C</span>
                        </span>
                        <br />
                        <span>{a.phrase}</span>
                   </div>
                  
                  
          
                   
                        <ul className='table-1'>
                            <li className='tag'>Wind: {a.wind}</li>
                            <li className='tag'>Wind gusts: {a.wind_gusts}</li>
                            <li className='tag'>Humidity: {a.humidity}</li>
                            <li className='tag'>Indoor humidity: {a.indoor_humidity}</li>
                        </ul>
                        <ul className='table-2'>
                            <li className='tag'>Air Quality: {a.air_quality}</li>
                            <li className='tag'>Dew Point: {a.dew_point}</li>
                            <li className='tag'>Cloud Cover: {a.cloud_cover}</li>
                            <li className='tag'>Visibility: {a.visibility}</li>
                            <li className='tag'>Cloud ceiling: {a.cloud_ceiling}</li>
                        </ul>
               
              
         
             
                          </div>
                   
                           
                        )                    
                    })
                    SetLoading(false)
                    setCard(fetchdata)
                })
    },[])
    
    return loading?(<Loading />):(
        <div>
            <h1 className='header'>Hourly Weather</h1>
            {Card} 
          
        </div>
    )
}

export default Hourly

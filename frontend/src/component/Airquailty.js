import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import WindLogo from '../asset/wind.gif'
import '../App.css'
import Loading from '../component/loading/Loading'
import ReadMore from './ReadMore'

const AirQuailty = () => {
    const[Card,SetCard] = useState('')
    const[AirCondition,SetAirCondition] = useState('')
    const[Aqinum, SetAqinum] = useState('')
    const[Aqstatement,SetAqstatement] = useState('')
    const[loading,SetLoading] = useState(true)
    useEffect(()=>{
        axios.get('http://localhost:8000/currentairquality')
        .then(response =>{
            const data =response.data   
            SetAirCondition(data[0].airqcondition)
            SetAqinum(data[0].aqinum)
            SetAqstatement(data[0].aqstatement)
            SetLoading(false)
        })


        axios.get('http://localhost:8000/pollutants')
            .then(response =>{
                const data = response.data
                
                const airquality = data.map((a)=>{
                    return(
                        <div className='card-item-box' key={a.title+a.cocentration}>
                            <div style={{padding:'25px'}}>
                            <h4 className='air-quality-smallcard-title'>{a.title}</h4>
                            <h5>{a.alert}</h5>
                            <h5>{a.index}</h5>
                            <span style={{fontWeight:'lighter',color:'grey'}}>{a.concentration}.</span>
                            <span style={{fontSize: '15px',lineHeight:'1.8'}}><ReadMore>{a.statement}
                            </ReadMore>
                            </span>
                            </div>
                        </div>
                    )
                })
                SetCard(airquality)
            })

         
    },[])
    return loading?(<Loading />):(
        <div >
           <h1 className='header'>Current Air Quality</h1>
        <div  id='air-container'> 
            <div className='air-allergy-box'>
           
                    <div className='air-quality-box'> 
                   
                    <div className='air-quality-logo-text'>
                    <img src={WindLogo} style={{width:'100px'}}/>    
                    <h3 style={{fontSize:'25px'}}>{Aqinum}<span style={{fontSize:'10px'}}>AQI</span></h3>
                    </div>
                    <h3>{AirCondition}</h3>
                    <p>{Aqstatement}</p>
                    </div>
              </div>
              </div>
              <div id='quality-container'>
                {Card}
              </div>
      </div>
      
    )
}

export default AirQuailty

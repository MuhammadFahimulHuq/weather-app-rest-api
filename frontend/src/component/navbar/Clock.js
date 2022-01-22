import axios from 'axios'
import React,{useEffect, useState} from 'react'
import '../../App.css'
import LoadingImage from '../../asset/loader.gif'
const Clock = () => {
    const[Loading,setLoading] = useState(true)
   const[Date, setDate] = useState('')
    const[CurrentDay,setCurrentDay] = useState('')
    const[Time,setTime]= useState('')
    useEffect(()=>{
       axios.get('http://localhost:8000/weather')
        .then(response =>{
            const data = response.data
            setDate(data[0].date)
            setCurrentDay(data[0].dateOfWeek)
            setTime(data[0].time)
            setLoading(false)
        }) 
    },[])

    return Loading ?(
            <img src={LoadingImage} alt='Loading...' style={{width: '90px'}} />):(
        <div className='clock-container'>
            <p>{CurrentDay}:{Date}</p>
            <p>{Time}</p>
        </div>)
      
    
}

export default Clock

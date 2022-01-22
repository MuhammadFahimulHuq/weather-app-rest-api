import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'
import WindLogo from '../asset/wind.gif'
import Loading from '../component/loading/Loading'
import ReadMore from './ReadMore'
const Items=()=> {
const[Title,SetTitle] = useState('')
const[Image,SetImage] = useState('image')
const[Temp,SetTemp] = useState('')
const[Temp_phrase,SetTime_phrase] = useState('')
const[AirCondition,SetAirCondition] =useState('')
const[Aqinum,SetAqinum] = useState('')
const[Aqstatement,SetAqstatement] = useState('')
const[Allergy,SetAllergy] = useState('')
const[Card,SetCard] = useState('')
const[loading,setLoading] = useState(true)
  useEffect(()=>{
      axios.get('http://localhost:8000/weather')
        .then(response => {
            const data = response.data
            SetTitle(data[0].title)
            SetImage(data[0].image)
            SetTemp(data[0].temp.replace('C',''))
            SetTime_phrase(data[0].temp_phrase)
          
           const allergy = data.map((a) =>{
           return(
            <div  className='allergy-item-box' key={a.allergy_name}>
            <img style={{width: '30px'}} src={a.allergy_image} />
            <span style={{width: '200px'}}>{a.allergy_name}</span>
            <span style={{fontWeight:'bolder',width:'70px'}}>{a.allergy_value}</span>
        </div>
           )   
           }) 
           SetAllergy(allergy)

           const weathercard = data.map((a)=>{
            if(a.cardtitle !== undefined){
                return(
                    <div className='card-box'  key={a.cardtempphrase} >
                    <h3 className='card-title'>{a.cardtitle}</h3>
                    <main>
                        <div className='celcius-box' key={a.cardtemp+a.cardtempphrase}>
                            <img src={a.cardimage} style={{width:'70px',marginTop:'10px'}}/>
                            <div className='celcius-box-temp'>
                            <span className='small-card-temp'>{a.cardtemp}</span>
                            <p style={{fontSize:'18px'}}>{a.cardtempphrase}</p>
                            </div>
                        </div>
                    </main>
                   
                </div>
                  )
            }  
          
            
           })
           SetCard(weathercard)
        })
        axios.get('http://localhost:8000/currentairquality')
            .then(response =>{
                const data =response.data   
                SetAirCondition(data[0].airqcondition)
                SetAqinum(data[0].aqinum)
                SetAqstatement(data[0].aqstatement)
                setLoading(false)
        })

        
  },[])
  
    return loading ?(<Loading />):(
        <div>

            <h2 className='header'>Current Weather</h2>
            <main>
           
            <div className='celcius-box'>
               
            <img src={Image} style={{width:'100px',marginTop:'10px'}}/>
            <div>        
            <h1 className='temp'>{Temp}<span className='celcius'>C</span></h1>
          
            </div>
            <span className='temp-phrase'>{Temp_phrase}</span>
            </div>
         
            </main>
           
           
            <div className='air-allergy-box'>

                    <div className='air-quality-box'> 
                    <h2 className='header'>Current Air Quality</h2>
                    <div className='air-quality-logo-text'>
                    <img src={WindLogo} style={{width:'100px'}}/>    
                    <h3 style={{fontSize:'25px'}}>{Aqinum}<span style={{fontSize:'10px'}}>AQI</span></h3>
                    </div>
                    <h3>{AirCondition}</h3>
                 
                     <span>
                         <ReadMore>
                        {Aqstatement}
                        </ReadMore>
                        </span>
                  
                   
                    </div>
                    
                <div className='allergy-box'>
                <h2 className='header'>Allergy Outlook</h2>
                <div >{Allergy}</div> 
                </div>
            </div>

            <div className='weather-card'>
            {Card}

            </div>
</div>
    )
}

export default Items

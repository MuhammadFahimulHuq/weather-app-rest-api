import React,{useState} from 'react'
import { Link} from 'react-router-dom'
import '../../App.css'

 const Navbar = () => {
     const [Style, setStyle] = useState('link link-style')
     const [StyleOne,setStyleOne] = useState('link')
     const [StyleTwo,setStyleTwo] = useState('link')
     const[StyleThree,setStyleThree] =useState('link')     
     const addStyle=()=>{
        setStyle('link link-style')
        setStyleOne('link')
        setStyleTwo('link')
        setStyleThree('link')
     } 
     const addStyleOne=()=>{
         setStyleOne('link link-style')
         setStyle('link')
         setStyleTwo('link')
         setStyleThree('link')
     }
     const addStyleTwo=()=>{
         setStyleTwo('link link-style')
         setStyle('link')
         setStyleOne('link')
         setStyleThree('link')
     }
     const addStyleThree=()=>{
         setStyleThree('link link-style')
         setStyle('link')
         setStyleOne('link')
         setStyleTwo('link')
     }
     
    return (
        
        <div className='box'>
           
            <h1>Dhaka,Bangladesh</h1>
            <div className='link-box'>
            <span > <Link to="/" className={Style} onClick={addStyle}>Today</Link></span>
            <span  ><Link to="/hourly" className={StyleOne} onClick={addStyleOne}>Hourly</Link></span >
            <span  ><Link to="/daily" className={StyleTwo} onClick={addStyleTwo}>Daily</Link></span >
            <span ><Link to="/airquality"  className={StyleThree} onClick={addStyleThree}>Air Quality</Link></span >
            </div>
          
        </div>
    
    )
}
export default Navbar
import React from 'react'
import loadinglogo from '../asset/loader.gif'

const loader=()=> {
    return (
        <div>
            <img  src={loadinglogo} style={{ width:'100px',margin:'auto',display:'block',marginTop:'15%'}} alt='loading...'/>
        </div>   )
}

export default loader

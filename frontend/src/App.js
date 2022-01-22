import React from 'react';
import './App.css';

import Navbar from './component/navbar/Navbar'
import Items from './component/Items';
import Footer from './component/Footer';
import Clock from './component/navbar/Clock'
import {  Route,Routes,BrowserRouter } from 'react-router-dom';
import AirQuailty from './component/Airquailty';
import Daily from './component/Daily';
import Hourly from './component/Hourly';

const App=()=> {


return (
<BrowserRouter>

<div id='container' >
<div className='navbar'><Navbar /></div>
<div className='clock'><Clock/></div>
<div className='items'>
<Routes>
  <Route exact path="/" element={<Items />}/>
  <Route path="/airquality" element={<AirQuailty />}/>
  <Route path="/daily" element={<Daily />}/>
  <Route path="/hourly" element={<Hourly />}/>
  </Routes>
  
</div>
<div className='footer'><Footer /></div>

</div>
</BrowserRouter>
  );
}

export default App;

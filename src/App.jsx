import React, { useState, useEffect } from 'react';
import API from './api/API';
import Loader from './Loader';
const App = () => {

  const [url, setUrl] =useState(API.API);
  const [search,setSearch] = useState('');
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);



const handlerSearch=(e)=>{
  if(e.key === 'Enter'){
    fetch(`https://${url.baseurl}q=${search}&units=metric&appid=${url.key}`)
      .then(response => response.json())
      .then((result) =>{
        setData(result);
        setSearch(""); 
      })  
      .catch(error =>console.error(error))
  }

}



setTimeout(()=>{
  setLoading(true);
  console.log(loading);
},4000);




const handlerBtn=(e)=>{
  
    fetch(`https://${url.baseurl}q=${search}&units=metric&appid=${url.key}`)
      .then(response => response.json())
      .then((result) =>{
        setData(result);
        setSearch(""); 
      })  
      .catch(error =>console.error(error))
  

}

const date=new Date();

const calendar={
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
  week:date.getDay(),

  months:[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  days:[
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
}






  return (
    <div className='wrapper'>
   { loading ?   
<>
      {(typeof data.name != 'undefined') ? (<div className="left-wp">
        <h1 className="country">
          {data.name},{data.sys.country}
        </h1>
        <p className="dates">{calendar.months[calendar.month]} {calendar.day}, {calendar.days[calendar.week]} ,{calendar.year} </p>
        <h1 className="deg">
          {Math.round(data.main.temp)}°<span>C</span>
        </h1>
        <p className="types">{data.weather[0].main}</p>
        <div className="temps">
          <span>{data.main.temp_min}°C </span> / <span> {data.main.temp_max}°C</span>
        </div>
      </div>) : <div className="left-wp"> <h2 className="sch">Search for any city :)</h2></div>}

      <div className="right-wp">

        <input
          type="text"
          className="search"
          placeholder='search'
          value={search}
          onKeyPress={handlerSearch}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <button className="btnse" onClick={()=>handlerBtn()} >search</button>

      </div>
      </> : 
      <>
      <Loader/>
      </>
}
    </div>
  );
};

export default App;
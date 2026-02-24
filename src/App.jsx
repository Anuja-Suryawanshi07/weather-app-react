import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Wind } from 'lucide-react';
import { Droplets } from 'lucide-react';
import axios from 'axios';

export default function App() {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed]= useState(null);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("01d");


  const API_KEY="5b64c198cd61ee76994285b2817ea33c"

  const fetchWeather= async()=>{
    console.log(search);
    if(!search) return;
    setLoading(true)
    try {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`);

      console.log(data);

      if(data.cod === 200){
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCityName(data.name);
        setWeatherIcon(data.weather[0].icon);
      }
    } catch (error) {
      console.log(error);
      setCityName("City not found")
      setTemperature(null)
      setHumidity(null)
      setWindSpeed(null)
      setWeatherIcon("01d")
    }
    setLoading(false)
  };

  return <>
  <div className='flex flex-col items-center justify-center h-screen bg-linear-to-br from-green-900 to-gray-900 text-white'>
    { /* Search Bar & icon */}
    <div className='flex items-center bg-white rounded-full px-4 py-2  mb-6 w-80 shadow-lg'>
      <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 text-black outline-none px-2' />
       <Search onClick={fetchWeather} className='text-gray-500 cursor-pointer' />
    </div>

    { /* Weather icon */}
    <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" className='w-48 h-48 mb-4'/>

    {/* Temprature & City Name */}
    <h1 className='text-4xl font bold'>{loading?"loading...":temperature!==null?`${temperature}°C`:"---"} </h1>
    <h2 className='text-2xl mt-2 font-semibold'>{cityName || "Type City Name to check Temperature"}</h2>

    {/* Humidity & Wind Speed */}
    <div className='w-full max-w-md mt-7 flex flex-col md:flex-row items-center justify-between md:items-start'>
      <div className='flex flex-col items-center mb-4 md:mb-0'>
        <Droplets className='text-3xl' />
        <span className='text-lg font-medium'>{humidity!==null?`${humidity}%`:"---"}</span>
        <p className='text-sm'>Humidity</p>
      </div>
      <div className='flex flex-col items-center'>
        <Wind  className='text-3xl'/>
        <span className='text-lg font-medium'>{windSpeed!==null?`${windSpeed}Km/h`:"---"} </span>
        <p className='text-sm'>Wind Speed</p>
      </div>

    </div>
  </div>
  
  
  </>
}
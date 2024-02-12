import './App.css';
import {useEffect, useState} from 'react';
import Clear from './assets/clear.jpg'
import Cloudy from './assets/cloudy.jpg'
import Overcast from './assets/overcast.jpg'
import Rainy from './assets/rainy.jpg'
import Snow from './assets/snowy.jpg'
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [place, setPlace] = useState('Boston');
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
   handleFetch();
  },[]);

  const handleInputChange = (event) => {
    setPlace(event.target.value);
  };

  const handleFetch = () => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=5267e3e5dd4047f5b1b93247242501&q=${place}&days=1&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(data => setPlaceInfo({
        name: data.location.name,
        country: data.location.country,
        farenheit: {
          current: data.current.temp_c,
          high: data.forecast.forecastday[0].day.maxtemp_c,
          low: data.forecast.forecastday[0].day.mintemp_c,    
        },
        condition: data.current.condition.text
      }))
      .catch(error => console.error('Error fetching data:', error));

      setPlace("");
  };



  return (

    <div 
    className='app' style={
    placeInfo.condition?.toLowerCase() === "clear" ||
    placeInfo.condition?.toLowerCase() === "sunny"
    ? {backgroundImage: `url(${Clear})`} 
    : placeInfo.condition?.includes('cloudy') 
    ? {backgroundImage: `url(${Cloudy})`}  
    : placeInfo.condition?.toLowerCase().includes('rain') 
    ? {backgroundImage: `url(${Rainy})`} 
    : placeInfo.condition?.toLowerCase().includes('snow') 
    ? {backgroundImage: `url(${Snow})`} 
    : {backgroundImage: `url(${Overcast})`}
   }
   
    >
      <div className='nav'>
        <h1>Weather Forecasts</h1>
      </div>
      
      <div className='search'>    
         <input type="text" value={place} onChange={handleInputChange} />
         <SearchIcon onClick={handleFetch}fontSize="medium" className='search-icon'> </SearchIcon>
      </div>

     <div className='main-container'>  
      {Object.keys(placeInfo).length > 0 && (
        <div className='weather-container'>
          <h2>{placeInfo.name}, {placeInfo.country}</h2>
          <div className='upper-card'>
            <h1>{placeInfo.farenheit?.current} °C</h1> 
            <div className='condition-high-low'>
              <h1>{placeInfo.condition}</h1>
              <h1>{placeInfo.farenheit?.high} °C</h1>
              <h1>{placeInfo.farenheit?.low} °C</h1>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;

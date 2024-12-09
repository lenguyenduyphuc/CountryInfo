import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)

    if (filter) {
      const regex = new RegExp(filter, 'i')
      const filteredCountries = allCountries.filter((country) =>
        country.name.common.match(regex)
      )
      setCountries(filteredCountries)
    } else {
      setCountries([])
    }
  }

  return {
    countries,
    newFilter,
    setCountries,
    handleFilterChange,
  }
}

export const useWeather = (country) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng;

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: lat,
          lon: lon,
          appid: import.meta.env.VITE_API_KEY,
          units: 'metric',
        },
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data.');
      });
  }, [country.capitalInfo, import.meta.env.VITE_API_KEY]);

  return {
    weather,
    error
  }
}

export const useField = (type) => {
  const [value, setValue] = useState()

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
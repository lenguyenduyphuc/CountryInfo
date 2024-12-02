import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Country.module.css';
import detailStyles from './CountryDetails.module.css';
import { Globe, MapPin, Phone } from 'lucide-react';

const Country = ({ country }) => {
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

  const renderNativeNames = () => {
    return Object.entries(country.name.nativeName || {}).map(([lang, name]) => (
      <li key={lang} className={detailStyles.nativeNameItem}>
        <span className={detailStyles.labelText}>{lang}:</span>
        <div>
          <div>{name.official}</div>
          <div>{name.common}</div>
        </div>
      </li>
    ));
  };

  const renderBorders = () => {
    return country.borders?.map((border) => (
      <span key={border} className={detailStyles.borderTag}>
        {border}
      </span>
    ));
  };

  if (!weather && !error) {
    return <p className={styles.loading}>Loading weather data...</p>;
  }

  const temperature = weather?.main?.temp;
  const weatherDesc = weather?.weather?.[0]?.description;
  const windSpeed = weather?.wind?.speed;
  const humid = weather?.main?.humidity;

  const iconCode = weather?.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.countryName}>{country.name.official}</h1>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>General Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Capital</p>
            <p className={styles.infoValue}>{country.capital[0]}</p>
          </div>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Population</p>
            <p className={styles.infoValue}>{country.population.toLocaleString()} people</p>
          </div>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Area</p>
            <p className={styles.infoValue}>{country.area.toLocaleString()} km²</p>
          </div>
          <div className={styles.infoItem}>
            <p className={styles.infoLabel}>Currency</p>
            <p className={styles.infoValue}>
              {Object.values(country.currencies).map((currency) => (
                <span key={currency.name}>
                  {currency.name} ({currency.symbol})
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className={detailStyles.detailsSection}>
        <div className={detailStyles.detailsGrid}>
          <div className={detailStyles.detailCard}>
            <h3 className={detailStyles.detailTitle}>
              <Globe size={20} />
              Native Names
            </h3>
            <ul className={detailStyles.nativeNamesList}>
              {renderNativeNames()}
            </ul>
          </div>

          <div className={detailStyles.detailCard}>
            <h3 className={detailStyles.detailTitle}>
              <MapPin size={20} />
              Geographic Information
            </h3>
            <ul className={detailStyles.infoList}>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>Region:</span>
                <span>{country.region}</span>
              </li>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>Subregion:</span>
                <span>{country.subregion}</span>
              </li>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>Start of Week:</span>
                <span>{country.startOfWeek}</span>
              </li>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>Timezone:</span>
                <span>{country.timezones[0]}</span>
              </li>
            </ul>
          </div>

          {country.borders && (
            <div className={detailStyles.detailCard}>
              <h3 className={detailStyles.detailTitle}>Bordering Countries</h3>
              <div className={detailStyles.bordersList}>
                {renderBorders()}
              </div>
            </div>
          )}

          <div className={detailStyles.detailCard}>
            <h3 className={detailStyles.detailTitle}>
              <Phone size={20} />
              Additional Information
            </h3>
            <ul className={detailStyles.infoList}>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>Independent:</span>
                <span>{country.independent ? 'Yes' : 'No'}</span>
              </li>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>UN Member:</span>
                <span>{country.unMember ? 'Yes' : 'No'}</span>
              </li>
              <li className={detailStyles.infoItem}>
                <span className={detailStyles.labelText}>Driving Side:</span>
                <span>{country.car.side}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>National Symbols</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h3 className={styles.sectionTitle}>Flag</h3>
            <img src={country.flags.svg} alt={country.flags.alt} className={styles.flag} />
            <p className={styles.flagCaption}>{country.flags.alt}</p>
          </div>
          {country.coatOfArms.svg && (
            <div className={styles.infoItem}>
              <h3 className={styles.sectionTitle}>Coat of Arms</h3>
              <img 
                src={country.coatOfArms.svg} 
                alt={`Coat of arms of ${country.name.common}`} 
                className={detailStyles.coatOfArms}
              />
            </div>
          )}
        </div>
      </section>

      {weather && (
        <section className={`${styles.section} ${styles.weatherSection}`}>
          <h2 className={styles.sectionTitle}>Weather in {country.capital[0]}</h2>
          <div className={styles.weatherInfo}>
            <img src={iconUrl} alt="Weather icon" className={styles.weatherIcon} />
            <p className={styles.infoValue}>{temperature}°C, {weatherDesc}</p>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>Humidity</p>
              <p className={styles.infoValue}>{humid}%</p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.infoLabel}>Wind Speed</p>
              <p className={styles.infoValue}>{windSpeed} m/s</p>
            </div>
          </div>
        </section>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Country;


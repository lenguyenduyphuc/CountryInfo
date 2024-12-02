import Country from './Country'
import styles from './Content.module.css'

const Content = ({countries, setCountries}) => {
  if (countries.length > 10){
    return (    
      <div className={styles.container}>
        <p className={styles.message}>
          Too many matches, please specify another filter
        </p>
      </div>
    )
  } else if ((countries.length > 1 && countries.length <= 10) || countries.length === 0){
    return (
      <div className={styles.container}>
        <ul className={styles.countryList}>
          {countries.map((country, i) => 
            <li key={i} className={styles.countryItem}>
              <span className={styles.countryName}>{country.name.official}</span>
              <button 
                className={styles.showButton}
                onClick={() => setCountries([country])}
              >
                Show details
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <Country country={countries[0]}/>
      </div>
    )
  }
}

export default Content


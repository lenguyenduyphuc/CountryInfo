import Content from './Components/Content'
import Filter from './Components/Filter'
import { useCountry } from './hooks'
import './style.css'

const App = () => {
  const {countries, handleFilterChange, setCountries, newFilter} = useCountry()
  return (
    <div className='container'>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App
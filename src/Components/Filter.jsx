import styles from './Filter.module.css';
import { useField } from '../hooks';

const Filter = ({ value, onChange }) => {
  const nameInput = useField('text')
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <label htmlFor="country-search" className={styles.filterLabel}>
          Find countries
        </label>
        <input
          id="country-search"
          autoFocus
          {...nameInput}
          value={value}
          onChange={onChange}
          className={styles.filterInput}
          placeholder="Type to search..."
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Filter;

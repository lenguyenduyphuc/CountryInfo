import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <label htmlFor="country-search" className={styles.filterLabel}>
          Find countries
        </label>
        <input
          id="country-search"
          type="text"
          value={value}
          onChange={onChange}
          className={styles.filterInput}
          placeholder="Type to search..."
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Filter;

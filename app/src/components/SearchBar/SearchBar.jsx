import styles from "./SearchBar.module.css";


const SearchBar = ({ searchInput, setSearchInput }) => {
    
    return (
        <div className={styles.search}>
                      <span className={styles.searchIcon}>🔍</span>
                      <input  
                        type="text" 
                        placeholder="Search by events or city...." 
                        value={searchInput}
                        onChange={(e) => {setSearchInput(e.target.value)}}
                        />
            
                      </div>
    )
}
export default SearchBar;
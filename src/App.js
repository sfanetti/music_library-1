import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';

import './App.css';

function App() {
  let [search, setSearch] = useState('');
  let [message, setMessage] = useState('Search for Music!!');
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!search) return
      document.title = `${search} Music`;
      const response = await fetch(`https://itunes.apple.com/search?term=${search}`);
      const resData = await response.json();
      if (resData.results.length) {
        setData(resData.results)
      } else {
        setData([]);
        setMessage("Nothing found for that artist")
      }

      console.log(resData)
    }
    fetchData();
  }, [search]);

  return (
    <div className="App">
      <DataContext.Provider value={ { setSearch, data } }>
        <SearchBar/>
        { message }
        <Gallery/>
      </DataContext.Provider>
    </div>
  );
}

export default App;

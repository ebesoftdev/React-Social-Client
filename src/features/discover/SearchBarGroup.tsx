import { useState, useEffect } from 'react';
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import SearchResult from '../search/SearchResult';
import ResultsListGroup from './ResultsListGroup';

export default function SearchBarGroup() {
  const [input, setInput] = useState("");
  const [initialResults, setInitialResults] = useState<SearchResult[]>([]);

  // Queries the DB only when the first character is typed into search bar. The results are then stored in initialResults (for further filtering) until the search bar is cleared (by backspacing, for instance)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  useEffect(() => {
    if (input !== "") {
      console.log(input);
      
      reverbClientWithAuth.get(`/api/search/group?query=${input}`)
        .then(resp => {
          console.log(resp.data.responses);
      
          if (resp.status.toString()[0] != "2") {
            console.log(resp.data);
          }

          setInitialResults(resp.data.responses);
        })
        .catch(err => console.log(err));
    }
  }, [input])

  return (
    <div id='search-container'>
      <input
        placeholder="Search for Groups"
        aria-label="search-input"
        aria-describedby="basic-addon1"
        value={input}
        onChange={handleChange}
      />
      {input && <ResultsListGroup results={initialResults.slice(0, 8)}/>}
    </div>
  );
}

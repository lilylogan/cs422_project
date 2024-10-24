
import React, { useEffect, useState } from 'react';
import HeartContainer from '../containers/heartContainer';
import SearchBarContainer from '../containers/searchContainer';
import RecipeList from './likedRecipeList'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Fetches data from the backend
export const fetchData = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/data`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from the backend:", error);
  }
};

// Generating the Liked page
function Liked() {
    
    const [data, setData] = useState(null);

    // The useEffect is where the data is fetched from
    useEffect(() => {
        console.log("fetching data!");
        const getData = async () => {
        const fetchedData = await fetchData();
        setData(fetchedData);
        };

    getData();
  }, []);

  // Jsonified on the page
  return (
    <div>
        <div>
            <SearchBarContainer />
            <RecipeList title="dummy Recipe" time="20 min" raiting="3/5"/>
        </div>
      {/*
        </div>
      <h1>Data from Backend</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>FLOP</p>}
    </div>
    */}
    </div>
  );

}

export default Liked;
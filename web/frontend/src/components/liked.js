/*
liked.js
Description: Fetches liked recipes from backend and displays the results as a list to the user.
Date: October 18th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useEffect, useState } from 'react';
import SearchBarContainer from '../containers/searchContainer';
import RecipeList from './likedRecipeList'
import {useAuth} from '../context/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Fetches data from the backend
const fetchData = async (userID) => {
  try {
      const response = await fetch(`${BACKEND_URL}/getLikedRecipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userID })
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      //console.log(data);
      return data;
  }
  catch(error) {
      console.error("Error fetching data from the backend:", error);
  }
};

// Generating the Liked page
function Liked() {
    const[generate, setGenerate] = useState(true)
    const [data, setData] = useState(null);
    const {user} = useAuth();
    // need to run when liked changes
    // The useEffect is where the data is fetched from
    useEffect(() => {
      if (generate) {
        console.log("fetching data!")
        const getData = async () => {
          if (user?.userID) {
            const fetchedData = await fetchData(user.userID); // Pass userID here
            setData(fetchedData);
          } else {
            console.error("User ID is not available");
          }
          setGenerate(false)
        };
        getData()
        console.log(user)
    }
  }, [user, generate]);

  // Jsonified on the page
  return (
    <div>
        <div>
            {/*<SearchBarContainer />*/}
            {/*data ? ( data.length === 0 ? (<h1>Add a recipe to Liked list to see here!</h1>) : (<pre>{JSON.stringify(data, null, 2)}</pre>)) : (<div>loading...</div>) */}
            {data ? ( data.length === 0 ? (<h1>Add a recipe to Liked list to see here!</h1>) : (data.map((recipe) => (<RecipeList key={recipe.recipeID} title={recipe.name} user={user} time={recipe.total_time} data={recipe} cuisine={recipe.cuisine} setGenerate={setGenerate}/>)))) : (<div>loading...</div>)}
            {/*data ? (<RecipeList title={data.name} time = {data.totalTime} data={data} cuisine={data.cuisine} />) : (<div>loading...</div>)*/}
         </div>

      
    </div>
  );

}

export default Liked;
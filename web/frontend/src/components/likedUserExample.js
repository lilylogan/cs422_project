/*
likedUserExample.js
Description: Example for a liked recipe for a given user.
Date: October 28th, 2024
Inital Author: Amanda Hoelting
Modified By: 
*/
import React, { useEffect, useState } from 'react';
import SearchBarContainer from '../containers/searchContainer';
import RecipeList from './likedRecipeList';
import { useAuth } from '../context/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Liked() {
    const [data, setData] = useState(null);
    /* Grabs user information with useAuth which pulls from backend, more info on how in AuthContext file :)*/
    const { user } = useAuth();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/getRandRecipe`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const recipeData = await response.json();
                    setData(recipeData);
                } else {
                    console.error("Failed to fetch recipe data");
                }
            } catch (error) {
                console.error("Error fetching recipe data:", error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <div>
                 {user && (
                    <div className="user-info">
                        <p>Welcome, {user.email}</p>
                    </div>
                )}
                <RecipeList 
                    title="dummy Recipe" 
                    time="20 min" 
                    raiting="3/5" 
                    data={data} 
                />
            </div>
        </div>
    );
}

export default Liked;
/*
home.js
Description: Component that displays the layout of the main home page and fetches recipes to display for tinder like interface.
Date: October 7th, 2024
Inital Author: Will Marceau
Modified By: 
*/
import React, { useState, useEffect } from 'react'
import DeckSwapContainer from '../containers/deckSwapContainer';
import RecipeCardContainer from '../containers/cardConatiner';
import {useAuth} from '../context/AuthContext';
import HelpButtonContainer from '../containers/helpContainer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchRandData = async (userID) => {
    // this function gets the random recipe for the discovery deck
    try {
        const response = await fetch(`${BACKEND_URL}/getRandRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userID }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data from the backend:", error);
    }
};

const fetchLikedData = async (userID) => {
    // this function gets a liked recipe for the liked deck
    try {
        const response = await fetch(`${BACKEND_URL}/getRandLikedRecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userID }),
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data from the backend:", error);
    }
};



function Home() {
    // holds the html for the homepage and all its components / containers

    // use states
    const [toggle, setToggle] = useState(false);
    const {user} = useAuth();
    const [generate, setGenerate] = useState(true);
    const [homeData, setData] = useState(null);

    useEffect(() => {
        // This function generates a new liked recipe or random recipe when 
        //triggered by generate
        if (generate === true) {
            setGenerate(false);
            console.log("fetching data!");
            const getData = async () => {
                if (user?.userID) {
                    const fetchedData = toggle
                        ? await fetchLikedData(user.userID)
                        : await fetchRandData(user.userID);
                    setData(fetchedData);
                } else {
                    console.error("User ID is not available");
                }
            };
            getData();
        }
    }, [generate, user, toggle]);

    const handleToggle = () => {
        // this funciton handles switching the toggle
        // from liked deck and recipe deck

        setToggle((prev) => !prev);
        setGenerate(true); // Trigger data regeneration
    };

    return (
        <div>
            <HelpButtonContainer />
                <DeckSwapContainer toggle={toggle} setToggle={handleToggle} />
            <RecipeCardContainer homeData = {homeData} toggle={toggle} stToggle={setToggle} setGenerate={setGenerate} />
        </div>
    )
}

export default Home;


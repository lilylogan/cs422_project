import React, { useState, useEffect } from 'react'
import DeckSwapContainer from '../containers/deckSwapContainer';
import RecipeCardContainer from '../containers/cardConatiner';
import {useAuth} from '../context/AuthContext';
import HelpButtonContainer from '../containers/helpContainer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchData = async (userID) => {
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

function Home() {
    const [toggle, setToggle] = useState(false);
    const {user} = useAuth();
    const [generate, setGenerate] = useState(true);
    const [homeData, setData] = useState(null);

    useEffect(() => {
        if (generate === true) {
            setGenerate(false);
            console.log("fetching data!");
            const getData = async () => {
                if (user?.userID) {
                    const fetchedData = await fetchData(user.userID); // Pass userID here
                    setData(fetchedData);
                } else {
                    console.error("User ID is not available");
                }
            };
            getData();
        }
    }, [generate, user]);


    return (
        <div>
            <HelpButtonContainer />
                <DeckSwapContainer toggle={toggle} setToggle={setToggle} />
            <RecipeCardContainer homeData = {homeData} toggle={toggle} stToggle={setToggle} setGenerate={setGenerate} />
        </div>
    )
}

export default Home;


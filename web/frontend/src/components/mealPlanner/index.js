import React, { useState, useEffect } from 'react';
import { THEME } from '../../constants/theme';
import { styles } from './styles';
import { DayPlanner } from './dayPlanner';
import { ShoppingList } from './shoppingList';
import CalendarView from './calendarView';
import {useAuth} from '../../context/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchShoppingList = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/getShoppingList`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shopping list');
    }

    const shoppingList = await response.json();
    console.log('Fetched shopping list:', shoppingList);
    return shoppingList;
  } catch (error) {
    console.error("Error fetching shopping list:", error);
    return null;
  }
};

/*  
    Description: Fetches meals for the meal planner from user's account.
    Returns: meals :: an object with days as keys and arrays of meals as values
*/
const fetchUserMeals = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/getPlannedMeals`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch meal plans');
    }

    const meals = await response.json();
    
    // Add debug logging
    console.log('Fetched meals:', meals);
    Object.entries(meals).forEach(([day, dayMeals]) => {
      console.log(`${day}: ${dayMeals.length} meals`);
    });
    
    return meals;
  } catch (error) {
    console.error("Error fetching meal plans:", error);
    return null;
  }
};

const MealPlanner = () => {
  // State to control the expanded/collapsed state of the meal planner
  const [isExpanded, setIsExpanded] = useState(true);

  // State to store the meal data
  const [meals, setMeals] = useState({
    Sunday: [], Monday: [], Tuesday: [], Wednesday: [],
    Thursday: [], Friday: [], Saturday: []
  });

  // State to store the shopping list items
  const [shoppingItems, setShoppingItems] = useState([]);

  // State to track the screen size and determine the layout
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1024);

  const {user} = useAuth();

  const [shoppingListKey, setShoppingListKey] = useState(0);

  const regenerateShoppingList = () => {
    setShoppingListKey(prevKey => prevKey + 1);
  };

  // Fetch meal data when component mounts
  useEffect(() => {
    const loadMealPlans = async () => {
      const userMeals = await fetchUserMeals();
      if (userMeals) {
        setMeals(userMeals);
      }
    };

    loadMealPlans();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle meal drag and drop between days
  const handleMealDrop = async (dragData, targetDay) => {
    if (dragData.day === targetDay) return;
  
    try {
      // Update the UI optimistically
      setMeals(prev => {
        const newMeals = { ...prev };
        newMeals[dragData.day] = newMeals[dragData.day].filter(m => m.id !== dragData.meal.id);
        newMeals[targetDay] = [...newMeals[targetDay], dragData.meal];
        return newMeals;
      });
  
      // Send update to backend
      const response = await fetch(`${BACKEND_URL}/api/update-meal-day`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealId: dragData.meal.id,
          newDay: targetDay
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update meal day');
      }
  
    } catch (error) {
      console.error('Error updating meal plan:', error);
      // Revert the UI changes if the update fails
      const userMeals = await fetchUserMeals();
      if (userMeals) {
        setMeals(userMeals);
      }
    }
  };

  // Function to toggle the "liked" status of a meal
  const handleToggleLike = (day, mealId) => {
    setMeals(prev => ({
      ...prev,
      [day]: prev[day].map(meal =>
        meal.id === mealId ? { ...meal, liked: !meal.liked } : meal
      )
    }));
  };
  const [generateAfterRemoveMeal, setGenerate] = useState(null);
  // Function to remove a meal from a specific day
  const handleRemoveMeal = async (day, mealId) => {
    try {
      // Update UI optimistically
      setMeals(prev => ({
        ...prev,
        [day]: prev[day].filter(meal => meal.id !== mealId)
      }));
  
      // Send delete request to backend
      const response = await fetch(`${BACKEND_URL}/api/remove-meal`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealId,
          day,
          user_id: user.userID
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove meal from database');
      }
  
      // Fetch and update the shopping list immediately after successful deletion
      const updatedShoppingList = await fetchShoppingList(user.userID);
      if (updatedShoppingList) {
        // Update the shopping list in the ShoppingList component
        setShoppingItems(updatedShoppingList);
    }
    // Force shopping list regeneration
    regenerateShoppingList();

    } catch (error) {
      console.error('Error removing meal:', error);
  
      // Revert the UI changes if the update fails
      const userMeals = await fetchUserMeals();
      if (userMeals) {
        setMeals(userMeals);
      }
    }
  };

  // Shopping List Functions
  const handleToggleItem = (id) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  

  const handleRemoveItem = async (item) => {
    for (const id of item.ids) {
      try {
        const response = await fetch(`${BACKEND_URL}/removeItemFromShoppingList`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.userID, item_id: id }),
        });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setGenerate(true);  // This triggers the useEffect to refetch
        return data;
      }
      catch(error) {
        console.error("Error fetching data from the backend:", error);
      }
    }
  };

  const handleAddItem = (name) => {
    if (!name.trim()) return;
    
    setShoppingItems(prev => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        checked: false
      }])
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.section, backgroundColor: THEME.primary }}>
        <div style={styles.header}>
          <h2 style={{ fontSize: '1.875rem' }}>Meal Planner</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={styles.expandButton}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        {isExpanded && (
          <>
            {isWideScreen ? (
              <CalendarView
                meals={meals}
                onMealDrop={handleMealDrop}
                onToggleLike={handleToggleLike}
                onRemoveMeal={handleRemoveMeal}
              />
            ) : (
              <div>
                {Object.entries(meals).map(([day, dayMeals]) => (
                  <DayPlanner
                    key={day}
                    day={day}
                    meals={dayMeals}
                    onMealDrop={handleMealDrop}
                    onToggleLike={handleToggleLike}
                    onRemoveMeal={handleRemoveMeal}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ShoppingList
        key={shoppingListKey}
        items={shoppingItems}
        onToggleItem={handleToggleItem}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddItem}
        regenerateShoppingList={() => {
          const loadShoppingList = async () => {
            const updatedList = await fetchShoppingList();
            if (updatedList) {
              setShoppingItems(updatedList);
            }
          };
          loadShoppingList();
        }}
        // setGenerateAfterRemoveMeal={setGenerateAfterRemoveMeal}
        // generateAfterRemoveMeal={generateAfterRemoveMeal}
      />
    </div>
  );
};

export default MealPlanner;
import React, { useState } from 'react';
import { THEME } from '../../constants/theme';
import { styles } from './styles';
import { DayPlanner } from './dayPlanner';
import { ShoppingList } from './shoppingList';

// Example initial data
const initialMeals = {
  Sunday: [
    { id: 1, name: 'Mushroom Salad', time: '20 min', rating: 3, liked: false },
    { id: 2, name: 'Teriyaki Chicken', time: '20 min', rating: 5, liked: true }
  ],
  Monday: [
    { id: 3, name: 'Lemon Chicken', time: '10 min', rating: 2, liked: true }
  ],
  Tuesday: [
    { id: 4, name: 'Ginger Chicken', time: '10 min', rating: 2, liked: false },
    { id: 5, name: 'Soy Chicken', time: '10 min', rating: 2, liked: true },
    { id: 6, name: 'Ginger Pasta', time: '10 min', rating: 2, liked: false }
  ],
  Wednesday: [],
  Thursday: [],
  Friday: [
    { id: 7, name: 'Butter Chicken', time: '90 min', rating: 5, liked: false },
    { id: 8, name: 'Grilled Cheese Sandwhich', time: '5 min', rating: 3, liked: true }
  ],
  Saturday: [    
    { id: 9, name: 'Marry Me Pasta', time: '30 min', rating: 4, liked: true }
  ]
};

const MealPlanner = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [meals, setMeals] = useState(initialMeals);
  const [shoppingItems, setShoppingItems] = useState([]);

  // Meal planner handlers
  const handleMealDrop = (dragData, targetDay) => {
    if (dragData.day === targetDay) return;

    setMeals(prev => {
      const newMeals = { ...prev };
      newMeals[dragData.day] = newMeals[dragData.day].filter(m => m.id !== dragData.meal.id);
      newMeals[targetDay] = [...newMeals[targetDay], dragData.meal];
      return newMeals;
    });
  };

  const handleToggleLike = (day, mealId) => {
    setMeals(prev => ({
      ...prev,
      [day]: prev[day].map(meal =>
        meal.id === mealId ? { ...meal, liked: !meal.liked } : meal
      )
    }));
  };

  const handleRemoveMeal = (day, mealId) => {
    setMeals(prev => ({
      ...prev,
      [day]: prev[day].filter(meal => meal.id !== mealId)
    }));
  };

  // Shopping list handlers
  const handleToggleItem = (id) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (name) => {
    setShoppingItems(prev => [
      ...prev,
      { id: Date.now(), name, checked: false }
    ]);
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

        {isExpanded && Object.entries(meals).map(([day, dayMeals]) => (
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

      <ShoppingList
        items={shoppingItems}
        onToggleItem={handleToggleItem}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default MealPlanner;
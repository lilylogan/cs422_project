/* 
mealPlannerContainer.js
Description: 
Date: 
Inital Author: 
Modified By: 
*/
import React, { useState } from 'react';
import { DayPlanner } from './DayPlanner';
import { THEME } from '../../constants/theme';

export const MealPlannerContainer = ({ weeklyMeals, onMealDrop, onToggleLike, onRemoveMeal }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div 
        onClick={() => setIsExpanded(!isExpanded)} 
        style={{ 
          padding: '1rem',
          backgroundColor: THEME.primary,
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2>Weekly Meal Planner</h2>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>

      {isExpanded && Object.entries(weeklyMeals).map(([day, meals]) => (
        <DayPlanner
          key={day}
          day={day}
          meals={meals}
          onMealDrop={onMealDrop}
          onToggleLike={onToggleLike}
          onRemoveMeal={onRemoveMeal}
        />
      ))}
    </div>
  );
};
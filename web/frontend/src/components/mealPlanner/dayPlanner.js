/*
dayPlanner.js
Description: The front end of the dayPlanner of the meal planner works in concert with index.js in the mealPlanner repositiory 
to handle the meal planner on narrower screens, including things such as moving meals, displaying meals, and removing meals.
Date: October 29th, 2024
Inital Author: Ellison Largent
Modified By: 
*/
import React, { useState } from 'react';
import { THEME } from '../../constants/theme';
import { styles } from './styles';
import HeartContainer from '../../containers/heartContainer';
import LearnMoreContainer from '../../containers/learnMoreContainer';
import ReactDOM from 'react-dom';
import {useAuth} from '../../context/AuthContext';

export const DayPlanner = ({ day, meals, onMealDrop, onToggleLike, onRemoveMeal }) => {
  const {user} = useAuth();
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onMealDrop(dragData, day);
  };

  // double click handler
  const [lastTap, setLastTap] = useState(null);

  const handleMealClick = (meal) => {
    const now = new Date().getTime();
    if (lastTap && now - lastTap < 500) {
      // Create a temporary container
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      
      // Render the LearnMoreContainer
      ReactDOM.render(
        <LearnMoreContainer 
          cname="listLearnMore" 
          data={meal} 
        />, 
        tempDiv,
        () => {
          // Find and click the learn more component
          const learnMoreElement = tempDiv.querySelector('.listLearnMore');
          if (learnMoreElement) {
            learnMoreElement.click();
          }
          
          // Clean up
          setTimeout(() => {
            ReactDOM.unmountComponentAtNode(tempDiv);
            document.body.removeChild(tempDiv);
          }, 0);
        }
      );
    }
    setLastTap(now);
  };

  // Custom handler for each heart
  const handleHeartClick = (mealId) => {
    onToggleLike(day, mealId);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ borderBottom: `1px solid ${THEME.border}` }}
    >
      <div style={styles.dayHeader}>
        <h3>{day}</h3>
      </div>
      
      <div>
        {meals.map(meal => (
          <div
            key={meal.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify({ day, meal }));
            }}
            onClick={() => handleMealClick(meal)}
            style={styles.meal}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div onClick={(e) => {
                e.stopPropagation();
                handleHeartClick(meal.id);
              }}>
                <HeartContainer 
                  start={meal.toggle}
                  user={user}
                  id={meal.id}
                  cname="plannerHeart"  
                  key={`${day}-${meal.id}`}
                />
              </div>
              <span>{meal.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ ...styles.badge, backgroundColor: THEME.secondary }}>
                {meal.total_time}
              </span>
              <span style={{ ...styles.badge, backgroundColor: THEME.primary }}>
                Cuisine: {meal.cuisine}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveMeal(day, meal.id);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
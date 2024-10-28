import React from 'react';
import { THEME } from '../../constants/theme';
import { styles } from './styles';
import HeartContainer from '../../containers/heartContainer';

export const DayPlanner = ({
  day,
  meals,
  onMealDrop,
  onToggleLike,
  onRemoveMeal
}) => {
  // Drag and drop handlers
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onMealDrop(dragData, day);
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
            style={styles.meal}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div onClick={() => handleHeartClick(meal.id)}>
                <HeartContainer 
                  cname="plannerHeart"  
                  key={`${day}-${meal.id}`}   // Ensure proper re-rendering when moved
                />
              </div>
              <span>{meal.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ ...styles.badge, backgroundColor: THEME.secondary }}>
                {meal.time}
              </span>
              <span style={{ ...styles.badge, backgroundColor: THEME.primary }}>
                Rating: {meal.rating}/5
              </span>
              <button
                onClick={() => onRemoveMeal(day, meal.id)}
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
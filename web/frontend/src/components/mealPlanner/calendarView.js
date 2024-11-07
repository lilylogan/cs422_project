import React from 'react';
import { THEME } from '../../constants/theme';
import { styles, calendarStyles } from './styles';
import HeartContainer from '../../containers/heartContainer';

const CalendarView = ({
  meals,
  onMealDrop,
  onToggleLike,
  onRemoveMeal
}) => {
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (day) => (e) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onMealDrop(dragData, day);
  };

  return (
    <div style={calendarStyles.calendarContainer}>
      <div style={calendarStyles.calendarGrid}>
        {fullDays.map((day) => (
          <div key={day} style={calendarStyles.dayHeader}>
            {day}
          </div>
        ))}
        
        {fullDays.map((day, index) => (
          <div
            key={day}
            style={calendarStyles.dayCell}
            onDragOver={handleDragOver}
            onDrop={handleDrop(day)}
          >
            {meals[day].map(meal => (
              <div
                key={meal.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({ day, meal })
                  );
                }}
                style={calendarStyles.mealCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = calendarStyles.mealCardHover.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = calendarStyles.mealCard.boxShadow;
                }}
              >
                <div style={calendarStyles.mealHeader}>
                  <div onClick={() => 
                    onToggleLike(day, meal.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <HeartContainer cname="plannerHeart" key={`${day}-${meal.id}`} />
                  </div>
                  <div style={calendarStyles.mealTitle}>
                    {meal.name}
                  </div>
                </div>
                
                <div style={calendarStyles.mealFooter}>
                  <span style={{ ...styles.badge, backgroundColor: THEME.secondary }}>
                    {meal.time}
                  </span>
                  <button
                    onClick={() => onRemoveMeal(day, meal.id)}
                    style={calendarStyles.removeButton}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = calendarStyles.removeButtonHover.color;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = calendarStyles.removeButton.color;
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
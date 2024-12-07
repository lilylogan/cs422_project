/*
calendarView.js
Description: The front end of the calendar view of the meal planner works in concert with index.js in the mealPlanner repositiory 
to handle the meal planner on wider screens, including things such as moving meals, displaying meals, and removing meals.
Date: October 29th, 2024
Inital Author: Ellison Largent
Modified By: Will Marceau
*/
import React, { useState } from 'react';
import { THEME } from '../../constants/theme';
import { styles, calendarStyles } from './styles';
import HeartContainer from '../../containers/heartContainer';
import LearnMoreContainer from '../../containers/learnMoreContainer';
import ReactDOM from 'react-dom';
import {useAuth} from '../../context/AuthContext';

/*
Description: Main CalendarView component that renders a drag-and-drop meal planner calendar view
*/
const CalendarView = ({ meals, onMealDrop, onToggleLike, onRemoveMeal }) => {
  const {user} = useAuth();
  const[lastTap, setLastTap] = useState(null);
  
  // Array representing full names of the days of the week
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* 
  Description: Prevents the default drag-and-drop behavior to allow custom drop handling
  Parameters: 
    - e (Event): The drag over event object
  Returns: void
  Purpose: Enables dropping of meals by preventing the default browser drag-and-drop behavior
  */
  const handleDragOver = (e) => e.preventDefault();

  /* 
  Description: Handles the dropping of a meal onto a specific day in the calendar
  Parameters: 
    - day (string): The target day to drop the meal onto
  Returns: Function that handles the drop event
  Purpose: Processes meal drag-and-drop by parsing the dragged meal data and calling the onMealDrop callback
  */
  const handleDrop = (day) => (e) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onMealDrop(dragData, day);
  };
  
  /* 
  Description: Handles double-tap interaction to show more details about a meal
  Parameters: 
    - meal (Object): The meal object to show more details for
  Returns: void
  Purpose: Creates a temporary DOM element to render the LearnMoreContainer when a meal is double-tapped
  */
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
  
  return (
    // Main container for the calendar grid
    <div style={calendarStyles.calendarContainer}>
      <div style={calendarStyles.calendarGrid}>
        {/* Render headers for each day of the week */}
        {fullDays.map((day) => (
          <div key={day} style={calendarStyles.dayHeader}>
            {day}
          </div>
        ))}
        
        {/* Render cells for each day with drag-and-drop and meal display */}
        {fullDays.map((day) => (
          <div
            key={day}
            style={calendarStyles.dayCell}
            onDragOver={handleDragOver}
            onDrop={handleDrop(day)}
          >
            {/* Map through meals for the current day and display each meal as a draggable item */}
            {meals[day].map((meal) => (
              // testing here
              <div
                key={meal.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    'text/plain',
                    JSON.stringify({ day, meal })
                  );
                }}
                onClick={() => handleMealClick(meal)} // Changed from onDoubleClick to onClick
                style={calendarStyles.mealCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = calendarStyles.mealCardHover.boxShadow;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = calendarStyles.mealCard.boxShadow;
                }}
              >
                {/* Meal card header with title and like (heart) toggle */}
                <div style={calendarStyles.mealHeader}>
                  <div
                     onClick={(e) => {
                       e.stopPropagation(); // Prevent triggering the meal click
                       onToggleLike(day, meal.id);
                     }}
                    style={{ cursor: 'pointer' }}
                  >
                    <HeartContainer cname="plannerHeart" key={`${day}-${meal.id}`} start={meal.toggle} id={meal.id} user={user}/>
                  </div>
                  <div style={calendarStyles.mealTitle}>
                    {meal.name}
                  </div>
                </div>
                
                {/* Meal card footer with time badge and remove button */}
                <div style={calendarStyles.mealFooter}>
                  <span style={{ ...styles.badge, backgroundColor: THEME.secondary }}>
                    {meal.total_time}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the meal click
                      onRemoveMeal(day, meal.id);
                    }}
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
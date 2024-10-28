import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '1rem',
  },

  mealPlannerSection: {
    marginBottom: '1rem',
    backgroundColor: '#db8b75',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },

  mealPlannerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.75rem',
  },

  mealPlannerTitle: {
    color: 'white',
    fontSize: '1.875rem',
    fontWeight: '500',
  },

  toggleButton: {
    color: 'white',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '9999px',
    fontSize: '1.2rem',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  calendarContainer: {
    backgroundColor: '#FFFBF3',
    padding: '1rem',
  },

  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem',
  },

  calendarHeader: {
    padding: '0.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #ab9f8a',
  },

  dayFull: {
    display: 'none',
    '@media (min-width: 640px)': {
      display: 'block',
    },
  },
  
  dayShort: {
    display: 'block',
    '@media (min-width: 640px)': {
      display: 'none',
    },
  },

  calendarCell: {
    padding: '0.5rem',
    height: '6rem',
    border: '1px solid #ab9f8a',
    '@media (min-width: 640px)': {
      height: '8rem',
    },
  },

  calendarCellContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFBF3',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    transition: 'background-color 0.5s',
  },

  shoppingListSection: {
    backgroundColor:'#FFFBF3',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },

  shoppingListHeader: {
    fontSize: '1.875rem',
    paddingBottom: '0.5rem',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #ab9f8a',
  },

  shoppingListItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  shoppingListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  itemCheckbox: {
    width: '1.25rem',
    height: '1.25rem',
    cursor: 'pointer',
    '@media (min-width: 640px)': {
      width: '1.5rem',
      height: '1.5rem',
    },
  },

  itemName: {
    fontSize: '1.125rem',
    '@media (min-width: 640px)': {
      fontSize: '1.25rem',
    },
  },

  itemNameChecked: {
    textDecoration: 'line-through',
    color: '#9ca3af',
  },

  removeButton: {
    color: '#ef4444',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem',
    fontSize: '1.2rem',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.7',
    transition: 'opacity 0.2s',
  },

  addItemForm: {
    display: 'flex',
    marginTop: '1.5rem',
  },

  addItemInput: {
    flex: '1',
    padding: '0.5rem',
    border: '1px solid #ab9f8a',
    borderRight: 'none',
    borderRadius: '0.375rem 0 0 0.375rem',
    fontSize: '1rem',
  },

  addItemButton: {
    backgroundColor: '#4A7B32',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '0 0.375rem 0.375rem 0',
    cursor: 'pointer',
    fontSize: '1.5rem',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const MealPlan = () => {
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [newItemInput, setNewItemInput] = useState('');

  const weekDays = [
    { full: 'Sunday', short: 'Su' },
    { full: 'Monday', short: 'M' },
    { full: 'Tuesday', short: 'Tu' },
    { full: 'Wednesday', short: 'W' },
    { full: 'Thursday', short: 'Th' },
    { full: 'Friday', short: 'F' },
    { full: 'Saturday', short: 'Sa' }
  ];

  const toggleCalendar = () => setIsCalendarExpanded(!isCalendarExpanded);
  
  const toggleItem = (id) => {
    setShoppingItems(shoppingItems.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id) => {
    setShoppingItems(shoppingItems.filter(item => item.id !== id));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newItemInput.trim()) {
      setShoppingItems([
        ...shoppingItems,
        {
          id: Date.now(),
          name: newItemInput.trim(),
          checked: false
        }
      ]);
      setNewItemInput('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mealPlannerSection}>
        <div style={styles.mealPlannerHeader}>
          <h2 style={styles.mealPlannerTitle}>Meal Planner</h2>
          <button 
            onClick={toggleCalendar} 
            style={styles.toggleButton}
          >
            {isCalendarExpanded ? '▲' : '▼'}
          </button>
        </div>
        
        {isCalendarExpanded && (
          <div style={styles.calendarContainer}>
            <div style={styles.calendarGrid}>
              {weekDays.map(day => (
                <div key={day.full} style={styles.calendarHeader}>
                  <span style={styles.dayFull}>{day.full}</span>
                  <span style={styles.dayShort}>{day.short}</span>
                </div>
              ))}
              {weekDays.map(day => (
                <div key={`cell-${day.full}`} style={styles.calendarCell}>
                  <div style={styles.calendarCellContent} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={styles.shoppingListSection}>
        <h2 style={styles.shoppingListHeader}>Shopping List</h2>
        
        <div style={styles.shoppingListItems}>
          {shoppingItems.map(item => (
            <div key={item.id} style={styles.shoppingListItem}>
              <div style={styles.itemContent}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(item.id)}
                  style={styles.itemCheckbox}
                />
                <span style={{
                  ...styles.itemName,
                  ...(item.checked && styles.itemNameChecked)
                }}>
                  {item.name}
                </span>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                style={styles.removeButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={addItem} style={styles.addItemForm}>
          <input
            type="text"
            value={newItemInput}
            onChange={(e) => setNewItemInput(e.target.value)}
            placeholder="Add new item..."
            style={styles.addItemInput}
          />
          <button type="submit" style={styles.addItemButton}>
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealPlan;
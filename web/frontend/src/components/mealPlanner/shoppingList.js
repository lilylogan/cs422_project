import React, { useState } from 'react';
import { THEME } from '../../constants/theme';
import { styles } from './styles';


export const ShoppingList = ({ items, onToggleItem, onRemoveItem, onAddItem }) => {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAddItem(newItem);
      setNewItem('');
    }
  };

  return (
    <div style={{ ...styles.section, backgroundColor: THEME.background, padding: '1.5rem' }}>
      <h2 style={{ 
        borderBottom: `1px solid ${THEME.border}`, 
        paddingBottom: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        Shopping List
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggleItem(item.id)}
              />
              <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                {item.name}
              </span>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '1.5rem' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          style={{
            flex: 1,
            padding: '0.5rem',
            border: `1px solid ${THEME.border}`,
            borderRadius: '0.375rem 0 0 0.375rem',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: `${THEME.secondary}`,
            color: 'white',
            padding: '0.5rem',
            width: '40px',
            border: 'none',
            borderRadius: '0 0.375rem 0.375rem 0',
          }}
        >
          +
        </button>
      </form>
    </div>
  );
};
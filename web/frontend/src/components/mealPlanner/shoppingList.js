/*
shoppingList.js
Description: The front end for fetching, inserting, and displaying the shopping list items and converting units. Works with the index page to display image.
Date: October 20th, 2024
Inital Author: Ellison Largent
Modified By: Lily Logan
*/
import React, { useEffect, useState } from 'react';
import { THEME } from '../../constants/theme';
import { styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import convert from 'convert-units'; 
 

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Function to convert units and return the converted quantity
function convertUnits(newQuantity, newUnit, existingQuantity, existingUnit) {
  // Logic for unit conversion should go here (implement this according to your requirements)
  return { quantity: convert(newQuantity).from(newUnit).to(existingUnit), unit: existingUnit }; // Example return
}

// Function to combine quantities after conversion
function combineItems(existingItem, newItem) {
  // Convert newItem quantity to the same unit as existingItem
  const convertedNewItem = convertUnits(newItem.quantity, newItem.unit, existingItem.quantity, existingItem.unit);

  // Add quantities
  const combinedQuantity = existingItem.quantity + convertedNewItem.quantity;

  // Return the combined item with extra_keys and name preserved
  return {
    name: existingItem.name, // Keep the name
    quantity: combinedQuantity,
    unit: existingItem.unit, // Keep the unit of the existingItem for consistency
    chekced: existingItem.checked,
    ids: [...existingItem.ids, ...newItem.ids], // Combine the ids (keys)
  };
}

// Process fetched data
function processFetchedData(fetchedData) {
  if (!fetchedData) {
    return fetchedData;
  }

  // Create a map to store combined items by a counter (numeric index)
  const combinedItemsMap = {};
  // let counter = 0; // Initialize a counter for unique keys

  // Loop through all items in fetchedData
  Object.entries(fetchedData).forEach(([id, item]) => {
    const { name, quantity, unit, checked } = item;

    // Create a new entry to track using the counter
    const newItem = {
      name,  // Keep the name
      quantity,
      unit,
      checked: checked,
      ids: [id], // Store extra keys as an array
    };

    // Check if the current item already exists in combinedItemsMap
    if (combinedItemsMap[name]) {
      if ((!unit) && (!combinedItemsMap[name].unit)) {
        const combined_quantity = quantity + combinedItemsMap[name].quantity
        combinedItemsMap[name] = {
          name: name, // Keep the name
          quantity: combined_quantity,
          unit: unit, // Keep the unit of the existingItem for consistency
          checked: combinedItemsMap[name].checked,
          ids: [...combinedItemsMap[name].ids, ...newItem.ids], // Combine the ids (keys)
        }
      }
      else if ((unit) && (combinedItemsMap[name].unit)) {
        combinedItemsMap[name] = combineItems(combinedItemsMap[name], newItem);
      }
      else {
        combinedItemsMap[name] = newItem;
      }

      // If item with the same counter exists, combine the items
      // combinedItemsMap[name] = combineItems(combinedItemsMap[name], newItem);
    } else {
      // If no existing item, add the new item to the map with the current counter
      combinedItemsMap[name] = newItem;
    }

  });

  return combinedItemsMap;
}

/* 
  Description: Fetches the shopping list for a specific user from the backend
  Parameters: userID - the unique identifier for the user
  Returns: Shopping list data for the specified user
  Purpose: Retrieve the shopping list items associated with a user's account
*/
const fetchShoppingList = async (userID) => {
  try {
    const response = await fetch(`${BACKEND_URL}/getShoppingList`, {
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
    return data;
  } catch (error) {
    console.error('Error fetching data from the backend:', error);
  }
};

/* 
  Description: React component for managing a shopping list
  Parameters: 
    - items: Optional prop for initial items 
    - onToggleItem: Callback for toggling item checked status
    - onRemoveItem: Callback for removing an item from the list
    - onAddItem: Callback for adding a new item to the list
  Returns: Rendered shopping list component with add, remove, and toggle functionality
  Purpose: Provide a user interface for managing shopping list items
*/
export const ShoppingList = ({ items, onToggleItem, onRemoveItem, onAddItem }) => {
  const [newItem, setNewItem] = useState('');
  const [data, setData] = useState(null);
  const { user } = useAuth();
  const[generate, setGenerate] = useState(true);
  const [display, setDisplay] = useState(null);

  /* 
  Description: Trigger list regeneration when items prop changes
  Parameters: items prop from parent component
  Returns: Updates generate state to trigger data refetch
  Purpose: Ensure shopping list is refreshed when external changes occur
  */
  useEffect(() => {
    // If items prop changes, trigger regeneration
    if (items) {
      setGenerate(true);
    }
  }, [items]);

  /* 
  Description: Fetch and process shopping list data when user or generate state changes
  Parameters: user context and generate state
  Returns: Sets processed shopping list data in display state
  Purpose: Retrieve and combine shopping list items for the current user
  */
  useEffect(() => {
    const getData = async () => {
      try {
        if (user?.userID && generate) {
          console.log('Regenerating shopping list...');
          const fetchedData = await fetchShoppingList(user.userID);
          if (fetchedData) {
            setData(fetchedData);
            const combined_data = processFetchedData(fetchedData);
            setDisplay(combined_data);
          }
        }
      } catch (error) {
        console.error('Error regenerating shopping list:', error);
      } finally {
        setGenerate(false);
      }
    };
  
    getData();
  }, [user, generate, items]); // Added items as a dependency

  /* 
  Description: Handle toggling the checked status of a shopping list item
  Parameters: id of the item to toggle
  Returns: Updates both data and display states, triggers backend update
  Purpose: Allow users to mark items as checked/unchecked and sync with backend
  */
  const handleToggle = (id) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
  
      // Find the display item corresponding to the given id
      const displayItem = display[id];
      if (!displayItem || !displayItem.ids) {
        console.error(`No display item or ids found for id: ${id}`);
        return prevData;
      }
  
      // Toggle `checked` for all associated IDs in `data`
      displayItem.ids.forEach((itemId) => {
        if (updatedData[itemId]) {
          updatedData[itemId] = {
            ...updatedData[itemId],
            checked: !updatedData[itemId].checked,
          };
  
          // Trigger backend update for each item
          fetch(`${BACKEND_URL}/checkItemInShoppingList`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user.userID, item_id: itemId }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Error updating item ${itemId}: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log(`Item ${itemId} updated successfully`, data);
            })
            .catch((error) => {
              console.error("Error updating item:", error);
            });
        }
      });
  
      // Return the updated state
      return updatedData;
    });

    setDisplay((prevDisplay) => ({
      ...prevDisplay,
      [id]: {
        ...prevDisplay[id],
        checked: !prevDisplay[id].checked,
      },
    }));
  };
  

  const [debugOutput, setDebugOutput] = useState('');

  /* 
  Description: Remove an item from the shopping list
  Parameters: item to be removed (with potentially multiple associated IDs)
  Returns: Triggers backend removal and list regeneration
  Purpose: Allow users to delete items from their shopping list
  */
  const handleRemoveItem = async (item) => {
    // get id from data not from display
    // const data_id = getDataId(id, data, setDebugOutput);
    // Loop through each key in the extra_keys of the item
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
        setGenerate(true);
        return data;
      }
      catch(error) {
        console.error("Error fetching data from the backend:", error);
      }
    }
  };

  /* 
  Description: Add a new item to the shopping list
  Parameters: name of the item to add
  Returns: Triggers backend addition and list regeneration
  Purpose: Allow users to add new items to their shopping list
  */
  const handleAddItem = async (name) => {
    if (!name.trim()) return;
    try {
      const response = await fetch(`${BACKEND_URL}/addItemToShoppingList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.userID, item: name.trim() }),
      });
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setGenerate(true);
      return data;
    }
    catch(error) {
      console.error("Error fetching data from the backend:", error);
    }
  };

  /* 
  Description: Handle form submission for adding a new item
  Parameters: form submission event
  Returns: Adds new item to shopping list and clears input
  Purpose: Provide a form-based interface for adding shopping list items
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      // onAddItem(newItem);
      handleAddItem(newItem);
      setNewItem('');
    }
  };

  return (
    <div style={{ ...styles.section, backgroundColor: THEME.background, padding: '1.5rem' }}>
      <h2 style={{ borderBottom: `1px solid ${THEME.border}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        Shopping List
      </h2>

      {/* Display shopping list */}
      {display && Object.entries(display).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(display).map(([id, item]) => (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggle(id)}
                />
                <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                  {item.name} - {item.quantity} {item.unit}
                </span>
              </div>
              <button
                onClick={() => handleRemoveItem(item)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* Add new item */}
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

      {/* Debugging: Display fetched and processed data */}
      {/* <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <h3>Debug Output</h3>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: '200px', overflow: 'auto' }}>
          {/* Debug combined data */}
          {/* {debugOutput || JSON.stringify(display, null, 2)}
        </pre>
      </div> */}
    </div>
  );

};
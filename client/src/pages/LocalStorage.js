// Save data to localStorage
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  // Load data from localStorage
  export const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  // Remove data from localStorage
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  // Clear all data from localStorage
  export const clearLocalStorage = () => {
    localStorage.clear();
  };
  
  // Export other utility functions as needed
  
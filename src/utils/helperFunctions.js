// Convert meters to kilometers
export const metersToKilometers = (meters) => (meters / 1000).toFixed(2);

// Format timestamp to readable date
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Capitalize first letter of a string
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

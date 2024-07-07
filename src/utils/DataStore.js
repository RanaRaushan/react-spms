import { useState } from "react";


export const DataStore = () => {
  // const [data, setData] = useState({});

  const setItem = (key, value) => {
    // setData({...data, [key]: value});
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key) => {
    const newData = { ...data };
    delete newData[key];
    // setData(newData);
    localStorage.removeItem(key);
  };

  const getItem = (key) => {
    const value = localStorage.getItem(key);
    return JSON.parse(value)
  };

  const getAllItem = () => {
    return data;
  };

  return {
    getAllItem,
    getItem,
    setItem,
    removeItem,
  };
};

export default DataStore;
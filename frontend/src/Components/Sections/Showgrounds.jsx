



// Showgrounds.js
// src/components/Showgrounds.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaygrounds } from '../../Features/citySlice'; // Adjust the path as necessary
import Cardcomponent from './Cardcomponent';
const Showgrounds = ({ selectedCity }) => {
  console.log(selectedCity, 'showselectedcity');
  const dispatch = useDispatch();

  const { filteredPlaygrounds, loading, error } = useSelector((state) => state.city || {});
console.log(filteredPlaygrounds,'filteredPlaygrounds')
  useEffect(() => {
    if (selectedCity) {
      console.log(selectedCity, 'cityinshowgrounds')
      dispatch(fetchPlaygrounds(selectedCity)); // Fetch playgrounds based on the selected city
    }
  }, [dispatch, selectedCity]);



  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="container-fluid cardsection">
     
      <div>
           <Cardcomponent grounds={filteredPlaygrounds} />
      </div>
    </div>
  );
};

export default Showgrounds;



import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchPlaygrounds } from "../../../Features/citySlice";
const Getlocations = ({ onCityFetched }) => {
    const dispatch = useDispatch();
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [city, setCity] = useState("");
  const [errorApi, setErrorApi] = useState(null);
  ////Get user location from streetMaps API///
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });

    // Call the reverse geocoding API
    getCityFromCoordinates(latitude, longitude);
  };

  console.log("userlatlong", location.latitude, location.longitude);
  const handleError = (error) => {
    if (error.code === error.PERMISSION_DENIED) {
      alert(
        "Location access denied. Please allow location access in your browser settings."
      );
    } else {
      setErrorApi(error.message);
    }
  };
  console.log("Error", errorApi);
  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      // Using OpenStreetMap's Nominatim API for reverse geocoding
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const city =
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village;
      const locationcity = response.data;
      console.log(city, 'city from the geolocation')
      if (city) {
        onCityFetched(city); // Pass the fetched city to the parent component
      }
      console.log("uselocationcity", locationcity);
      dispatch(fetchPlaygrounds(city));
      setCity(city);
     
    } catch (error) {
      setErrorApi("Unable to retrieve city data");
    }
  };

  const requestLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    requestLocationAccess(); // Request location access when component mounts
  }, []);
  return (
    <>
      <button className="btn btn-primary my-3 " onClick={requestLocationAccess}>
        Use Current Location
      </button>
    </>
  );
};

export default Getlocations;

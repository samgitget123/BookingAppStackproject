// Herosection.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCity,
  selectArea,
  fetchPlaygrounds,
} from "../../Features/citySlice";
import brandlogo from "../../Images/brandlogonobg.png";
import Carousels from "./promotions/Carousels";
import Getlocations from "./locations/Getlocations";
import TypingText from "./animations/Typingtext";
//import { useState } from 'react';
const Herosection = () => {
  const dispatch = useDispatch();
  const { cities, selectedCity, selectedArea, loading, error } = useSelector(
    (state) => state.city
  );
  const [city, setCity] = useState("");
  const [isGetLocationDisabled, setIsGetLocationDisabled] = useState(false);
  //it has taken from the use current location as  a prop from Getlocations component
  const handleCityFetched = (fetchedCity) => {
    setCity(fetchedCity); // Update local city state
    dispatch(selectCity(fetchedCity)); // Dispatch to Redux store
    dispatch(fetchPlaygrounds(fetchedCity)); // Fetch playgrounds for the city
    setIsGetLocationDisabled(true);
  };
  const handleCityChange = (event) => {
    const city = event.target.value;
    dispatch(selectCity(city));
    if (city) {
      dispatch(fetchPlaygrounds(city)); // Fetch data when city is selected
      setIsGetLocationDisabled(true); // Disable Get Location button
    }
  };

  const handleAreaChange = (event) => {
    dispatch(selectArea(event.target.value));
  };
  // Re-enable Get Location button if city state is cleared
  useEffect(() => {
    if (!selectedCity) {
      setIsGetLocationDisabled(false);
    }
  }, [selectedCity]);
  return (
    <>
      <section className=" text-dark  primaryColor ">
        <div className="container-fluid">
          <div className=" d-sm-flex justify-content-evenly ">
            <div className="row">
              <div className="col-lg-8">
               <Carousels/>
              </div>

              <div className="col-lg-4 secondaryColor">
                <div className="d-flex align-items-center justify-content-center text-center">
                  <div className="mt-sm-5">
                    <div className="mb-3 d-none d-sm-block mb-sm-5 ">
                      <img
                        className="img-fluid rotateImage"
                        src={brandlogo}
                        alt="logo"
                      />
                    </div>
                    <TypingText/>
                    <form role="search" onSubmit={(e) => e.preventDefault()}>
                      <select
                        className="form-control my-3"
                        value={selectedCity || city}
                        onChange={handleCityChange}
                      >
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city.city}>
                            {city.city }
                          </option>
                        ))}
                      </select>
                      <select
                        className="form-control my-3"
                        value={selectedArea}
                        onChange={handleAreaChange}
                        disabled={!selectedCity}
                      >
                        <option value="">Select an area</option>
                        {selectedCity &&
                          cities
                            .find((city) => city.city === selectedCity)
                            ?.addresses.map((addr, index) => (
                              <option key={index} value={addr.area}>
                                {addr.area}
                              </option>
                            ))}
                      </select>
                    </form>
                    <div>
                   <Getlocations  onCityFetched={handleCityFetched} disabled={isGetLocationDisabled}/>
                    </div>
                    <div>
                      <h4 className="webheading">
                        Find Grounds{" "}
                        <span className="webheading2"> @ Your Nearest</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;

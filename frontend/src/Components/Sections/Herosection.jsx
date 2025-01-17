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

const Herosection = () => {
  const dispatch = useDispatch();
  const { cities, selectedCity, selectedArea, loading, error } = useSelector(
    (state) => state.city
  );

  const [city, setCity] = useState(selectedCity || "");
  const [area, setArea] = useState(selectedArea || "");
  const [isGetLocationDisabled, setIsGetLocationDisabled] = useState(false);

  // Handle city and area fetched from Getlocations component
  const handleCityFetched = ({ state, district, area }) => {
    console.log(state, district, area, "locations");

    // Update local state
    setCity(state);
    setArea(area);

    // Update Redux store
    dispatch(selectCity(state)); // Set city in Redux store
    dispatch(selectArea(area)); // Set area in Redux store

    // Fetch playgrounds for the selected city
    dispatch(fetchPlaygrounds(area));

    // Disable the Get Location button
    setIsGetLocationDisabled(true);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;

    // Update local and global state
    setCity(selectedCity);
    dispatch(selectCity(selectedCity));

    // Clear the area when the city changes
    setArea("");
    dispatch(selectArea(""));

    // Fetch playgrounds for the selected city
    if (selectedCity) {
      dispatch(fetchPlaygrounds(selectedCity));
      setIsGetLocationDisabled(true); // Disable Get Location button
    }
  };

  const handleAreaChange = (event) => {
    const selectedArea = event.target.value;

    // Update local and global state
    setArea(selectedArea);
    dispatch(selectArea(selectedArea));
  };

  // Re-enable the Get Location button if the city is cleared
  useEffect(() => {
    if (!selectedCity) {
      setIsGetLocationDisabled(false);
    }
  }, [selectedCity]);

  return (
    <>
      <section className="text-dark primaryColor">
        <div className="container-fluid">
          <div className="row">
            {/* Carousel Section */}
            <div className="col-lg-8 d-none d-md-block">
              <Carousels />
            </div>

            {/* Form Section */}
            <div
              className="col-lg-4 secondaryColor"
              style={{ borderRadius: "0px 0px 40px 40px" }}
            >
              <div className="d-flex align-items-center justify-content-center text-center">
                <div className="mt-2 mt-md-5">
                  <div className="mb-3 d-none d-sm-block mb-sm-5">
                    <img
                      className="img-fluid rotateImage"
                      src={brandlogo}
                      alt="logo"
                    />
                  </div>
                  <TypingText />
                  <form role="search" onSubmit={(e) => e.preventDefault()}>
                    {/* City Dropdown */}
                    <select
                      className="form-control my-3"
                      value={city}
                      onChange={handleCityChange}
                    >
                      <option value={city}>{city}</option>
                     
                        

                    </select>

                    {/* Area Dropdown */}
                    <select
                      className="form-control my-3"
                      value={area}
                      onChange={handleCityChange}
                    >
                      <option value={area}>{area}</option>
                     
                        

                    </select>
                  </form>

                  {/* Get Location Button */}
                  <div>
                    <Getlocations
                      onCityFetched={handleCityFetched}
                      disabled={isGetLocationDisabled}
                    />
                  </div>

                  <div>
                    <h4 className="webheading">
                      Find Grounds{" "}
                      <span className="webheading2">@ Your Nearest</span>
                    </h4>
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

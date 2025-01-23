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
import { telanganaCities } from "../Data/CityData";
import { FaMapMarkerAlt } from "react-icons/fa";

const Herosection = () => {
  const dispatch = useDispatch();
  const { selectedCity, loading, error } = useSelector((state) => state.city);
console.log(selectedCity, 'selectedcityredux')
  const [city, setCity] = useState(""); // Default state
  const [place, setPlace] = useState(""); // Default city
  const [isGetLocationDisabled, setIsGetLocationDisabled] = useState(false);

  // Function to handle state changes
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setCity(selectedState);
    setPlace(""); // Reset city when state changes
   
    // Dispatch data for the entire state
    dispatch(fetchPlaygrounds({ State: selectedState, City: "" }));
  };

  // Function to handle city changes
  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setPlace(selectedCity);

    // Dispatch data based on state and selected city
    dispatch(fetchPlaygrounds({ State: city, City: selectedCity }));
  };

  // Handle data fetched from Getlocations
  const handleCityFetched = ({ state, district, area }) => {
    setCity(state);
    setPlace(district);

    // Dispatch data for the detected city
    dispatch(fetchPlaygrounds({ State: state, City: district }));
    setIsGetLocationDisabled(true);
  };

  // Re-enable "Get Location" button when state is reset
  useEffect(() => {
    if (!city) {
      setIsGetLocationDisabled(false);
    }
  }, [city]);

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

                  {/* User State and City Dropdowns */}
                  <form role="search" onSubmit={(e) => e.preventDefault()}>
                    {/* State Dropdown */}
                    <select
                      className="form-control my-3"
                      value={city}
                      onChange={handleStateChange}
                      style={{ borderRadius: "20px", fontWeight: "bold" }}
                    >
                      <option value="Telangana">Telangana</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>

                    {/* City Dropdown */}
                    <select
                      className="form-control my-3"
                      value={place}
                      onChange={handleCityChange}
                      style={{ borderRadius: "20px"}}
                    >
                      <option value="">Select City</option>
                      {telanganaCities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
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
      <section>
        
      </section>
    </>
  );
};

export default Herosection;

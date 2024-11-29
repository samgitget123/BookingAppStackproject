// Herosection.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCity,
  selectArea,
  fetchPlaygrounds,
} from "../../Features/citySlice";
import banner1 from "../../Images/crickbanner.jpg";
import banner2 from "../../Images/bgcrick.jpg";
import banner3 from "../../Images/banner.jpg";
import brandlogo from "../../Images/brandlogonobg.png";
import axios from "axios";
//import { useState } from 'react';
const Herosection = () => {
  const dispatch = useDispatch();
  const { cities, selectedCity, selectedArea, loading, error } = useSelector(
    (state) => state.city
  );
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [errorApi, setErrorApi] = useState(null);
  const [city, setCity] = useState("");
  //images
  const banners = [banner1, banner2, banner3]; // Array of banner images
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

  const handleCityChange = (event) => {
    const city = event.target.value;
    dispatch(selectCity(city));
    if (city) {
      dispatch(fetchPlaygrounds(city)); // Fetch data when city is selected
    }
  };

  const handleAreaChange = (event) => {
    dispatch(selectArea(event.target.value));
  };

  return (
    <>
      <section className=" text-dark  primaryColor ">
        <div className="container-fluid">
          <div className=" d-sm-flex justify-content-evenly ">
            <div className="row">
              <div className="col-lg-8">
                <div
                  id="carouselExample"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-interval="3000"
                >
                  <div className="carousel-inner">
                    {banners.map((banner, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={banner}
                          className="d-block w-100"
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              <div className="col-lg-4 secondaryColor">
                <div className="d-flex align-items-center justify-content-center text-center">
                  <div className="mt-sm-5">
                    <div className="mb-3 d-none d-sm-block mb-sm-5 ">
                      <img
                        className="img-fluid w-50 rotateImage"
                        src={brandlogo}
                        alt="logo"
                      />
                    </div>
                    <h4 className="my-3  herofont">
                      Choose Your <span className="spanfont">Ground</span>
                    </h4>
                    <form role="search" onSubmit={(e) => e.preventDefault()}>
                      <select
                        className="form-control my-3"
                        value={selectedCity || city}
                        onChange={handleCityChange}
                      >
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city.city}>
                            {city.city}
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
                      <button
                        className="btn btn-primary my-3 "
                        onClick={requestLocationAccess}
                      >
                        Use Current Location
                      </button>
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

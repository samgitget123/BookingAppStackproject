import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loaderGif from "../../Images/loader.gif";
import SearchBar from "./requires/SearchBar";
import { useBaseUrl } from "../../Contexts/BaseUrlContext";

const CardComponent = ({ grounds }) => {
  console.log(grounds, 'GROUNDS');
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]); // Default to an empty array

  const { baseUrl } = useBaseUrl();
  const navigate = useNavigate();

  // Handle filtered data update when grounds change
  useEffect(() => {
    setFilteredData(grounds || []); // Update with the current grounds or an empty array
  }, [grounds]);

  // Handle cards per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setCardsPerPage(4);
      } else if (
        window.matchMedia("(min-width: 769px) and (max-width: 1028px)").matches
      ) {
        setCardsPerPage(8);
      } else {
        setCardsPerPage(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate a loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  // Handle search bar filtering
  const handleSearch = (results) => {
    setFilteredData(results);
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCardClick = (gid) => {
    navigate(`/viewground/${gid}`, { state: gid });
  };

  return (
    <div className="my-3">
      <div>
        <SearchBar data={grounds} onSearch={handleSearch} />
      </div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <img
            src={loaderGif}
            alt="Loading..."
            className="img-fluid loadergifimage"
          />
        </div>
      ) : (
        <div className="row g-2">
          {currentCards && currentCards.length > 0 ? (
            currentCards.map((playground, index) => (
              <div
                className="col-lg-2 col-md-6 col-sm-12"
                key={index}
                onClick={() => handleCardClick(playground.ground_id)}
              >
                <div
                  className="card shadow-lg border-0 rounded"
                  style={{ width: "100%" }}
                >
                  <div
                    className="card-img-top"
                    style={{
                      height: "200px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {playground.data.photo ? (
                      <img
                        src={`${baseUrl}/uploads/${playground.data.photo}`}
                        alt={playground.data.name}
                        className="img-fluid"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span>No Image Available</span>
                    )}
                  </div>
                  <div className="card-body secondaryColor">
                    <h4 className="card-title teritoryFont cardheadfont">
                      <i className="fa-thin fa-cricket-bat-ball"></i>{" "}
                      {playground.data.name}
                    </h4>
                    <p className="card-text teritoryFont">
                      <i
                        className="fas fa-map-marker-alt"
                        style={{ color: "#00EE64" }}
                      ></i>{" "}
                      {playground.data.location}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center fw-bold text-secondary">
                No playgrounds available for the selected filters.
              </p>
            </div>
          )}
        </div>
      )}
      {filteredData.length > 0 && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 d-flex justify-content-between">
            <button
              className="btn btn-sm secondaryColor teritoryFont"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="btn btn-sm secondaryColor teritoryFont"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardComponent;

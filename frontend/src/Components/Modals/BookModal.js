import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setObject } from '../../Features/objectSlice';
import { useBaseUrl } from "../../Contexts/BaseUrlContext";

const BookModal = ({
  showModal,
  handleCloseModal,
  selectedSlots = [],
  selectdate,
}) => {
  const { gid } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [name, setName] = useState(""); // State for Name
  const [email, setEmail] = useState(""); // State for Email
  const [mobile, setMobile] = useState(""); // State for Mobile
  const dispatch = useDispatch();
  const { baseUrl } = useBaseUrl();

  const handleBooking = async (gid, selectedSlots, selectdate) => {
    const bookingData = {
      ground_id: gid,
      date: selectdate,
      slots: selectedSlots,
      name: name,   // Include name
      email: email, // Include email
      mobile: mobile // Include mobile number
    };

    try {
      const response = await fetch(`${baseUrl}/api/booking/book-slot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (data) {
        dispatch(setObject(data));
        setInfo(data.message);
      }
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }
  }, [showModal]);

  const formatslot = (selectedSlots) => {
    if (!Array.isArray(selectedSlots) || selectedSlots.length === 0) return "";

    const formatTime = (hours, minutes) => {
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHours}:${minutes} ${period}`;
    };

    const firstSlot = String(selectedSlots[0]);
    const lastSlot = String(selectedSlots[selectedSlots.length - 1]);

    const isValidSlot = (slot) => /^(\d+(\.\d+)?)$/.test(slot);

    if (!isValidSlot(firstSlot) || !isValidSlot(lastSlot)) {
      console.error("Invalid slot format detected.");
      return "Invalid slot format";
    }

    const [startHours, startHalf] = firstSlot.split(".").map(Number);
    const startMinutes = startHalf === 0 ? "00" : "30";
    const startTime = formatTime(startHours, startMinutes);

    const [endHours, endHalf] = lastSlot.split(".").map(Number);
    const endTime = formatTime(
      endHours + (endHalf === 0 ? 0 : 1),
      endHalf === 0 ? "30" : "00"
    );

    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      <div
        className={`modal fade ${showModal ? "show modal-animate" : ""}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg rounded-3">
            <div className="modal-header text-white" style={{ backgroundColor: "#006849" }}>
              <h5 className="modal-title" id="exampleModalLabel">
                Booking Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body text-center">
              <h6 className="mb-3">Your Selected Slots</h6>
              <div className="alert alert-info py-2">
                {selectedSlots.length > 0 ? (
                  <span>{formatslot(selectedSlots)}</span>
                ) : (
                  <span>No slots selected.</span>
                )}
              </div>
              <div className="my-3">
                <strong>Date:</strong> {selectdate}
              </div>

              {/* Input Fields for Name, Email, and Mobile */}
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              {info && <div className="alert alert-success">{info}</div>}
              <p className="text-muted">
                Please review the details before confirming.
              </p>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={selectedSlots.length === 0 || !name || !email || !mobile}
                onClick={() => handleBooking(gid, selectedSlots, selectdate)}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default BookModal;

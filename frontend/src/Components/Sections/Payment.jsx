import React from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const paymentdata = location.state; // Retrieve data from the state
  console.log(paymentdata.data , 'paymentdata');
  const selectedSlots = paymentdata.data.slots;
 // Function to format a single slot
 const formatslot = (selectedSlots) => {
  if (!Array.isArray(selectedSlots) || selectedSlots.length === 0) return ""; // Ensure selectedSlots is a valid array

  // Function to format time from 24-hour to 12-hour with AM/PM
  const formatTime = (hours, minutes) => {
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Extract the first and last slots from the selectedSlots array
  const firstSlot = selectedSlots[0];
  const lastSlot = selectedSlots[selectedSlots.length - 1];

  // Get start time from the first slot
  const [startHours, startHalf] = firstSlot.split(".").map(Number);
  const startMinutes = startHalf === 0 ? "00" : "30";
  const startTime = formatTime(startHours, startMinutes);

  // Get end time from the last slot (end 30 minutes after the last slot)
  const [endHours, endHalf] = lastSlot.split(".").map(Number);
  const endTime = formatTime(
    endHours + (endHalf === 0 ? 0 : 1),
    endHalf === 0 ? "30" : "00"
  );

  // Return the formatted time range as one value
  return `${startTime} - ${endTime}`;
};
  return (
    <>
      <section className="d-flex justify-content-center">
        <div className="container p-3 my-3 rounded"  style={{ backgroundColor: "#006849" }}>
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <section className="text-white">
                <h2>Payment Overview</h2>
                <p>Make secure and fast payments for your ground bookings.</p>
              </section>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="d-flex justify-content-center">
                <div
                  className="card payment-card shadow-lg w-100"
                  style={{ maxWidth: "500px" }}
                >
                  <div className="card-header text-center bg-secondary text-white">
                    <h3>Payment Details</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="text-center text-muted">Ground Booking</h5>
                    <div className="mb-2">
                      <p>
                        <strong>Ground Name:</strong>{" "}
                        {paymentdata.data.ground_id}
                      </p>
                      <p>
                        <strong>Date:</strong> {paymentdata.data.date}
                      </p>
                      <p>
                        <strong>Slot:</strong>{" "}
                        {formatslot(paymentdata.data.slots)}
                      </p>
                      <p>
                        <strong>Total Price:</strong> ₹{paymentdata.data.price}
                      </p>
                    </div>
                    <form>
                      <div className="form-group mb-2">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="form-control"
                          placeholder="Enter your card number"
                          required
                        />
                      </div>

                      <div className="row mb-2">
                        <div className="col-md-6">
                          <label htmlFor="expiryDate">Expiry Date</label>
                          <input
                            type="text"
                            id="expiryDate"
                            className="form-control"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            type="password"
                            id="cvv"
                            className="form-control"
                            placeholder="123"
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group mb-2">
                        <label htmlFor="cardName">Cardholder Name</label>
                        <input
                          type="text"
                          id="cardName"
                          className="form-control"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-100">
                        Pay ₹{paymentdata.data.price}
                      </button>
                    </form>
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

export default Payment;

import React from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const paymentdata = location.state; // Retrieve data from the state

  return (
    <>
     <section>
        <div className="container">
          <div className="row mb-4">
          </div>
          <section style={{ backgroundColor: "#006849" }} className="p-3 rounded">
            <div className="row g-4">
              <div className="col-lg-5 col-md-12">
                <section className="text-white">
                  <h2>Payment Overview</h2>
                  <p>Make secure and fast payments for your ground bookings.</p>
                </section>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="d-flex justify-content-center">
                  <div className="card payment-card shadow-lg w-100" style={{ maxWidth: "500px" }}>
                    <div className="card-header text-center bg-secondary text-white">
                      <h3>Payment Details</h3>
                    </div>
                    <div className="card-body">
                      <h5 className="text-center text-muted">Ground Booking</h5>
                      <div className="mb-3">
                        <p>
                          <strong>Ground Name:</strong> {paymentdata.data.ground_id}
                        </p>
                        <p>
                          <strong>Date:</strong> {paymentdata.data.date}
                        </p>
                        <p>
                          <strong>Slot:</strong> {paymentdata.data.slots.join(", ")}
                        </p>
                        <p>
                          <strong>Total Price:</strong> ₹{paymentdata.data.price}
                        </p>
                      </div>
                      <form>
                        <div className="form-group mb-3">
                          <label htmlFor="cardNumber">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            className="form-control"
                            placeholder="Enter your card number"
                            required
                          />
                        </div>

                        <div className="row mb-3">
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

                        <div className="form-group mb-4">
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
          </section>
        </div>
      </section>
    </>
  );
};

export default Payment;

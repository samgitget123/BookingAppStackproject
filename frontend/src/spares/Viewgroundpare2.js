import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroundDetails } from "../../Features/groundSlice";
import groundImage from "../../Images/turf.jpeg";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loaderGif from "../../Images/loader.gif";
//Modal
import BookModal from "../Modals/BookModal";
//base url
import { useBaseUrl } from "../../Contexts/BaseUrlContext";

//const baseUrl = `http://localhost:5000`;
//const baseUrl = `https://bookingapp-r0fo.onrender.com`;
// Helper function to format slot times
const formatSlot = (slot) => {
  const [hours, minutes] = slot.split(".").map(Number);
  const startHours = Math.floor(hours);
  const startMinutes = minutes === 0 ? 0 : 30;
  const endHours = startMinutes === 0 ? startHours : startHours + 1;
  const endMinutes = startMinutes === 0 ? 30 : 0;

  return `${String(startHours).padStart(2, "0")}:${String(
    startMinutes
  ).padStart(2, "0")} - ${String(endHours).padStart(2, "0")}:${String(
    endMinutes
  ).padStart(2, "0")}`;
};

// Helper function to reverse format slot
const reverseFormatSlot = (formattedSlot) => {
  const [startTime] = formattedSlot.split(" - ");
  const [hours, minutes] = startTime.split(":").map(Number);
  return minutes === 0 ? `${hours}.0` : `${hours}.5`;
};
// Helper function to format date to "YYYY-MM-DD"
const formatDate = (date) => {
  if (!(date instanceof Date)) {
    // Attempt to convert the date to a Date object
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ViewGround = () => {
  const { gid } = useParams();
  const dispatch = useDispatch();
  const { baseUrl } = useBaseUrl();
  const navigate = useNavigate();
  const groundState = useSelector((state) => state.ground || {});
  const { ground, loading, error } = groundState;
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (gid) {
      dispatch(fetchGroundDetails(gid));
      fetchGroundDetailsWithDate(formatDate(selectedDate));
    }
  }, [dispatch, gid, selectedDate]);

  const fetchGroundDetailsWithDate = async (formattedDate) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/ground/${gid}?date=${formattedDate}`
      );
      //http://localhost:5000/api/ground/GND18NT79YDS?date=2024-12-25
      setBookings(response.data.slots.booked || []);
      setSelectedSlots([]);
    } catch (error) {
      console.error("Error fetching ground details:", error);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Example function to format slot
  const formatSlot = (slot) => {
    // Implement your formatSlot function here
    return slot; // Example: return formatted slot
  };

  const confirnnowClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };
  // const handleBookClick = async () => {
  //   const slotsForAPI = selectedSlots.map(reverseFormatSlot);
  //   if (selectedSlots.length > 0) {
  //     const bookingData = {
  //       ground_id: gid, // Ground ID from route params
  //       date: new Date().toISOString().slice(0, 10), // Current date in 'YYYY-MM-DD' format
  //       slots: slotsForAPI, // Selected slots
  //       combopack: true, // Assuming you want combopack true, can be dynamic if needed
  //     };

  //     try {
  //       const response = await axios.post(
  //         `${baseUrl}/api/booking/book-slot`,
  //         bookingData
  //       );

  //       if (response.status === 200) {
  //         navigate(`/booking/${gid}`);
  //       } else {
  //         alert("Booking failed, please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error during booking:", error);
  //       alert("An error occurred while booking. Please try again later.");
  //     }
  //   } else {
  //     alert("Please select at least one slot to book.");
  //   }
  // };
  // const now = new Date();
  // let hours = now.getHours(); // Current hour (0-23)
  // const minutes = now.getMinutes(); // Current minute (0-59)
  // const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
  // hours = hours % 12 || 12; // Convert 0 to 12 for midnight and 13-23 to 1-11
  // const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  // console.log(formattedTime, 'currenttime'); // e.g., "02:07 PM"
  
  
  // const handleSlotClick = (slot) => {

  //   console.log(convertSlotToTimeRange(slot),formattedTime, 'selectedslot');
  //   if (selectedSlots.includes(slot)) {
     
  //     setSelectedSlots(selectedSlots.filter((s) => s !== slot));
  //   } else {
  //     setSelectedSlots([...selectedSlots, slot]);
  //   }
  // };
  const now = new Date();
let hours = now.getHours(); // Current hour (0-23)
const minutes = now.getMinutes(); // Current minute (0-59)
const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
hours = hours % 12 || 12; // Convert 0 to 12 for midnight and 13-23 to 1-11
const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;


// Function to compare slot time with current time
// const isSlotPastCurrentTime = (slotTime) => {
//   const [slotHours, slotMinutes] = slotTime.split(':').map(Number); // Split slot time (e.g., "14:30")
//   const slotDate = new Date();
//   console.log(slotDate,'slottime')
//   slotDate.setHours(slotHours, slotMinutes, 0, 0); // Create a Date object for the slot

//   return slotDate < now; // Check if the slot is in the past
// };
const isSlotPastCurrentTime = (slotTime) => {
  const [slotHour, slotMinutes] = slotTime.split(":").map(Number); 
  const slotDate = new Date();
  slotDate.setHours(slotHour, slotMinutes, 0, 0); // Create a Date object for the slot time
  return slotDate < now; // Checks if the slot is in the past compared to current time
};

// const handleSlotClick = (slot) => {
//   const slotTime = convertSlotToTimeRange(slot); // Assume slot is in "HH:mm" format
//   console.log(slotTime, formattedTime,isSlotPastCurrentTime(slot), 'selectedslot');

//   // Check if the slot is in the past
//   if (isSlotPastCurrentTime(slotTime)) {
//     alert('Please select a current or future time slot');
//     return;
//   }

//   if (selectedSlots.includes(slot)) {
//     setSelectedSlots(selectedSlots.filter((s) => s !== slot));
//   } else {
//     setSelectedSlots([...selectedSlots, slot]);
//   }
// };
const handleSlotClick = (slot) => {
  const slotTime = convertSlotToTimeRange(slot);
  if (isSlotPastCurrentTime(slotTime)) {
    alert("Please select a current or future time slot");
    return;
  }

  setSelectedSlots((prevSelected) =>
    prevSelected.includes(slot)
      ? prevSelected.filter((s) => s !== slot)
      : [...prevSelected, slot]
  );
};

console.log(selectedSlots, 'selectedslots');
  if (loading) return <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "300px" }}
  >
    <img
      src={loaderGif}
      alt="Loading..."
      className="img-fluid loadergifimage"
    />
  </div>;

  if (error) return <div>Error: {error}</div>;
  if (!ground) return <div>No ground data available</div>;
  console.log(ground, 'grounddetails');
  const { name, location, data, slots } = ground;
  const imageUrl = data?.photo || groundImage;
  console.log(data.image, 'imageurl');
  const description = data?.desc || "No Description";
  const bookedSlots = slots?.booked || [];
  // const allSlots = ['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0', '12.5', '1.0', '1.5', '2.0' , '2.5' , '3.0','3.5','4.0','4.5','5.0','5.5','6.0','6.5','7.0','7.5','8.0','8.5','9.0','10.0','10.5','11.0','11.5','12.0','12.5','13.0','13.5'];
  const allSlots = [
    "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5",
    "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0", "13.5",
    "14.0", "14.5", "15.0", "15.5", "16.0", "16.5", "17.0", "17.5",
    "18.0", "18.5", "19.0", "19.5", "20.0", "20.5", "21.0", "21.5",
    "22.0", "22.5", "23.0", "23.5", "24.0", "24.5", "0.0", "0.5",
    "1.0", "1.5"
  ]


  // Helper function to convert slot value to time range with AM/PM
  const availableSlots = allSlots
    .filter((slot) => !bookings.includes(slot))
    .map(formatSlot);
  const bookedslotsbydate = bookings.map(formatSlot);

  const convertSlotToTimeRange = (slot) => {
   
    let [hours, half] = slot.split(".").map(Number);
  
    // Initialize variables for time range
    let startHour, startMinutes, endHour, endMinutes, startPeriod, endPeriod;
  
    // Determine the start time
    if (hours >= 0 && hours < 12) {
      // Morning slots (12 AM to 11:59 AM)
      startHour = hours === 0 ? 12 : hours; // Convert 0 to 12 for midnight
      startMinutes = half === 0 ? "00" : "30";
      startPeriod = "AM";
    } else {
      // Afternoon and evening slots (12 PM to 11:59 PM)
      startHour = hours === 12 ? 12 : hours - 12; // Convert to 12-hour format
      startMinutes = half === 0 ? "00" : "30";
      startPeriod = "PM";
    }
  
    // Determine the end time
    if (half === 0) {
      // If half is 0 (start at :00), end at :30 within the same hour
      endHour = startHour;
      endMinutes = "30";
      endPeriod = startPeriod;
    } else {
      // If half is 1 (start at :30), end at :00 of the next hour
      endHour = startHour === 12 ? 1 : startHour + 1; // Handle 12 -> 1 transition
      endMinutes = "00";
      endPeriod = startHour === 11 && startPeriod === "AM" ? "PM" :
                  startHour === 11 && startPeriod === "PM" ? "AM" : startPeriod; // Handle AM/PM transitions
    }
    const slottime =  `${startHour}:${startMinutes} ${startPeriod} - ${endHour}:${endMinutes} ${endPeriod}`
    console.log('avlslots', slottime, '----', 'currenttime', formattedTime)
    // Format and return the time range
    return `${startHour}:${startMinutes} ${startPeriod} - ${endHour}:${endMinutes} ${endPeriod}`;
  };
  
  // const convertSlotToTimeRange = (slot) => {
  //   let [hours, half] = slot.split(".").map(Number);

  //   // Initialize variables for time range
  //   let startHour, startMinutes, endHour, endMinutes, period, endPeriod;

  //   // Determine the start time
  //   if (hours >= 0 && hours < 6) {
  //     // Early morning slots (12 AM - 6 AM)
  //     startHour = hours === 0 ? 12 : hours; // Convert 0 to 12 for midnight
  //     startMinutes = half === 0 ? "00" : "30";
  //     period = "AM";
  //   } else if (hours >= 6 && hours < 12) {
  //     // Morning slots (6 AM - 12 PM)
  //     startHour = hours;
  //     startMinutes = half === 0 ? "00" : "30";
  //     period = "AM";
  //   } else if (hours === 12) {
  //     // Noon slots (12 PM)
  //     startHour = 12;
  //     startMinutes = half === 0 ? "00" : "30";
  //     period = "PM";
  //   } else {
  //     // Afternoon and evening slots (1 PM - 11 PM)
  //     startHour = hours - 12; // Convert to 12-hour format
  //     startMinutes = half === 0 ? "00" : "30";
  //     period = "PM";
  //   }

  //   // Determine the end time
  //   endHour = half === 0 ? startHour : startHour === 12 ? 1 : startHour + 1;
  //   endMinutes = half === 0 ? "30" : "00";
  //   endPeriod = endHour >= 12 ? "PM" : "AM"; // Adjust for end time period

  //   // Correct the end hour if it exceeds 12
  //   if (endHour > 12) {
  //     endHour -= 12;
  //   }

  //   // Return the formatted time range
  //   return `${startHour}:${startMinutes} ${period} - ${endHour}:${endMinutes} ${endPeriod}`;
  // };
  return (
    <section className="viewcardbg">
      <div className="selectdatesection">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div >
                <DatePicker

                  selected={selectedDate}
                  onChange={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      fetchGroundDetailsWithDate(formatDate(date));
                    }
                  }}
                  dateFormat="MMMM d, yyyy"
                  className="form-control"

                />
              </div>
            </div>
          </div>
          <div>
            <p>
              <strong>Selected Date: </strong>
              {formatDate(selectedDate)}
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid  pt-3">
        {/* Available Slots Section */}
        <div className="mobileconfirmnow d-sm-none d-flex justify-content-center my-3">
          <button
            variant="primary"
            className="btn btn-primary confirmbtn"
            onClick={confirnnowClick}
            disabled={selectedSlots.length === 0}
          >
            Confirm Now
          </button>
        </div>

        <div className="row">
          <div className="col-lg-8 col-sm-12 col-md-12 ">
            <div className="d-flex  justify-content-evenly justify-content-md-start flex-wrap mb-3" style={{ backgroundColor: "#006849" }}>
              <div>
                <div>
                  <h6 className="teritoryFont text-light text-center mt-3">
                    Available Slots:
                  </h6>
                  <ul className="list-unstyled d-flex flex-wrap flex-column flex-sm-row slotboxes">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot, index) => (
                        <li key={index} className="listbox m-1">
                          <button
                            className={`btn ${selectedSlots.includes(slot)
                                ? "btn-success"
                                : "btn-primary"
                              } btn-sm availablebtn`}
                            onClick={() => handleSlotClick(slot)}
                          >
                            {convertSlotToTimeRange(slot)}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="teritoryFont">No available slots</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="mt-sm-3 d-flex ">
                <div className="text-center">
                  <h6 className="text-light mt-3">Booked Slots:</h6>
                  <ul className="list-unstyled d-flex flex-wrap flex-column flex-sm-row text-center slotboxes">
                    {bookedslotsbydate.length > 0 ? (
                      bookedslotsbydate.map((slot, index) => (
                        <li key={index} className="listbox m-1 text-center">
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm availablebtn"
                            disabled
                          >
                            {convertSlotToTimeRange(slot)}{" "}
                            {/* Format if needed */}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-danger text-center nobookedslots m-1">
                        No booked slots
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 col-xlg-6 g-0  ">
            <div className="card shadow-lg border-0 w-80 rounded secondaryColor viewcardFont  mx-auto">
              <div className="mobileconfirmnow d-flex justify-content-center my-3">
                <button
                  variant="primary"
                  className="btn btn-primary confirmbtn"
                  onClick={confirnnowClick}
                  disabled={selectedSlots.length === 0}
                >
                  Confirm Now
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  src={`${baseUrl}/uploads/${data.image}`}
                  className="card-img-top ground-image img-fluid mb-3"
                  alt={name || "Ground Image"}
                  style={{ width: '300px', height: '200px' }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{name || "No Name"}</h5>
                <h6 className="card-subtitle mb-2 viewcardFont">
                  Location: {location || "No Location"}
                </h6>
                <p className="card-text viewcardFont">{description}</p>
              </div>
            </div>

          </div>
        </div>

        {/* BookModal component */}
        <BookModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedSlots={selectedSlots}
          selectdate={formatDate(selectedDate)}
        />
      </div>
    </section>
  );
};

export default ViewGround;

const endpoints = {
    development: {
      API_BASE_URL: "https://bookingapp-r0fo.onrender.com",  //https://bookingapp-r0fo.onrender.com/
    },
    production: {
      API_BASE_URL: "http://localhost:5000",  // Production endpoint
    },
  };
  
  const ENV = process.env.NODE_ENV || "production"; // Default to production
  console.log("Using environment:", ENV);
console.log("API Base URL:", endpoints[ENV].API_BASE_URL);
  export default endpoints[ENV];
  
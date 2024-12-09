const endpoints = {
  production: {
    API_BASE_URL: "https://bookingapp-r0fo.onrender.com",  // production endpoint
  },
  development: {
    API_BASE_URL: "http://localhost:5000",  // development endpoint
  },
};

const ENV = process.env.NODE_ENV || "development"; // Default to production
console.log("Using environment:", ENV);
console.log("API Base URL:", endpoints[ENV].API_BASE_URL);
export default endpoints[ENV];

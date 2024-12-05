import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Components/Sections/Header';
import Home from './Components/Sections/Home';
import ViewGround from './Components/Sections/ViewGround';
import Booknow from './Components/Sections/Booknow';
import Payment from './Components/Sections/Payment';
// Redux
import { Provider } from 'react-redux';
import store from './Store';
// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// CSS
import './App.css';
import Footer from './Components/Sections/Footer';
const App = () => {
  const base_url = process.env;
  console.log(base_url,'base_url')
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
        <Header /> {/* Placed outside of <main> so that header appears on all pages */}
        <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/viewground/:gid" element={<ViewGround />} />
              <Route path="/payment/:gid" element={<Payment />} />
            </Routes>
        </main>
        <Footer/>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

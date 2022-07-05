import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home.component';
import TravelingForm from './traveling-form.component';
import Travelings from './travelings.component';
import LoginBarComponent from './login-bar.component';
import LoginFormComponent from './login-form.component';
import RegisterComponent from './register.component';
import TransportationComponent from './transportation.component';
import PageErrorComponent from './page-error.component';
import FooterComponent from './footer.component';

function Navigation() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <Link className="navbar-brand" to="/travelings">
          Traveling
        </Link>
        <LoginBarComponent />
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travelings" element={<Travelings />} />
          <Route path="/travelings/add" element={<TravelingForm />} />
          <Route path="/travelings/:travelingId" element={<TravelingForm />} />
          <Route path="/login" element={<LoginFormComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route
            path="travelings/:travelingId/transportations"
            element={<TransportationComponent />}
          />
          <Route path="*" element={<PageErrorComponent />} />
        </Routes>
      </div>
      <FooterComponent />
    </Router>
  );
}

export default Navigation;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './features/Login/Login';
import ContactsContainer from './features/Contacts/ContactsContainer';

function App() {
  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/contacts" element={<ContactsContainer />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

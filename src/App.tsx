import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './features/Login/Login';
import ContactsContainer from './features/Contacts/ContactsContainer';
import NewContact from './features/Contacts/NewContact/NewContact';

function App() {
  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="App">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ContactsContainer />} />
              <Route path="/newContact" element={<NewContact />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

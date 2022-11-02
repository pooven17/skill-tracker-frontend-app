import React from 'react';
import './asserts/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import SigninComponent from './components/SigninComponent';
import SearchEmpSkillComponent from './components/SearchEmpSkillComponent';
import EmpSkillListComponent from './components/EmpSkillListComponent';
import EditEmpSkillComponentNew from './components/EditEmpSkillComponentNew';
import AddDeleteTableRows from './components/AddDeleteTableRows';

function App() {

  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="App-Content">
          <Routes>
            <Route path="/" element={<SigninComponent />} />
            <Route path="/search-employee-skill" element={<SearchEmpSkillComponent />} />
            <Route path="/employee-skills" element={<EmpSkillListComponent />} />
            <Route path="/edit-employee-skill" element={<EditEmpSkillComponentNew />} />
            <Route path="/edit" element={<AddDeleteTableRows />} />
            
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
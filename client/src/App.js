import React from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './modules/Menu';

function App() {
  return (
    <div className="App">
      <button className="collapsible react-button" onClick={() => {
          document.getElementById("React-header").classList.toggle("collapse");
        }}
        >React Info</button>
      <header id="React-header" className="App-header collapse">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
      <Menu name="New" />
    </div>
  );
}

export default App;

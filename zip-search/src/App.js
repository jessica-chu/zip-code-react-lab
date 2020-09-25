import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div>This is the City component</div>);
}

function ZipSearchField(props) {
  return (<div>
    <strong>Zip Code:</strong>
    <input type="text" className="input" placeholder="Try 10016" />
  </div>);
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField />
        <div>
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;

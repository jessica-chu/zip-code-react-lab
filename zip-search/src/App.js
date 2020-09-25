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
  // Store value that is provided by the user
  state = {
    userInputValue: "",
    state: [],
    location: [],
    estimatePop: [],
    totalWages: []
  }

  handleZipChange(event) {
    console.log(event.target.value);
    fetch('http://ctp-zip-api.herokuapp.com/zip/:Zipcode')
      .then(response => response.json())
      .then(json => {
        this.setState({
          state: json.State,
          location: json.Location,
          estimatedPop: json.EstimatedPopulation,
          totalWages: json.TotalWages
        })
      })
  }

  // Create an array of <City /> elements

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={ (e) => this.handleZipChange(e) } />
        <div>
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;

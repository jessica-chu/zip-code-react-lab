import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div class="card w-50">
      <div class="card-header">
        {this.props.city}, {this.props.state}
      </div>
      <div class="card-body">
        <ul>
          <li>State: {this.props.state}</li>
          <li>Location: {this.props.location}</li>
          <li>Population (estimated): {this.props.estimatedPop}</li>
          <li>Total Wages: {this.props.totalWages}</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <strong>Zip Code:</strong>
      <input type="text" className="input" placeholder="Try 10016" />
    </div>);
}


class App extends Component {
  // Store value that is provided by the user
  state = {
    userInputValue: "",
    city: [],
    state: [],
    location: [],
    estimatePop: [],
    totalWages: []
  }

  handleZipChange(event) {
    console.log(event.target.value);
    fetch('http://ctp-zip-api.herokuapp.com/zip/10016')
      .then(response => response.json())
      .then(json => {
        this.setState({
          city: json.City,
          state: json.State,
          location: json.Location,
          estimatedPop: json.EstimatedPopulation,
          totalWages: json.TotalWages
        })
      })
      .catch(error => console.log(error));
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

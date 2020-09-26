import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="card w-50">
      <div className="card-header">
        {props.city}, {props.state}
      </div>
      <div className="card-body">
        <ul>
          <li>State: {props.state}</li>
          <li>Location: {props.location}</li>
          <li>Population (estimated): {props.estimatedPop}</li>
          <li>Total Wages: {props.totalWages}</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <strong>Zip Code:</strong>
      <input type="text" onChange={ props.zipChanged } value={ props.zipValue } placeholder="Try 10016" />
  <p>You entered: { props.zipValue }</p>
    </div>);
}


class App extends Component {
  // Store value that is provided by the user
  state = {
    userInputValue: "",
    cities: []
  }

  handleZipChange(event) {
    console.log(event.target.value);
    this.setState({
      userInputValue: event.target.value
    })
    fetch('http://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          cities: json
        })
      })
  }

  render() {
    const cities = this.state.cities;
    const cityArray = [];
    
    // Create an array of <City /> elements
    for (let i = 0; i < cities.length; i++) {
      const isCity = cities[i];

      cityArray.push (
        <City
          key = {i}
          city = {isCity['City']}
          state = {isCity['State']}
          location = {isCity['Lat'] + ", " + isCity['Long']}
          estimatedPop = {isCity['EstimatedPopulation']}
          totalWages = {isCity['TotalWages']}
        />
      )
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={ (e) => this.handleZipChange(e) } zipValue={ this.state.userInputValue } />
        <div>
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;

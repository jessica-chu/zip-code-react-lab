import React, { Component } from 'react';
import './App.css';


function City(props) {
  var lowerCaseName = (props.city).toLowerCase();

  return (
    <div className="card w-50 center my-3">
      <div className="card-header">
        <span className="text-capitalize">{lowerCaseName}</span>, {props.state}
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
    <div className="text-center mt-4">
      <strong>Zip Code:</strong>
      <input type="text" onChange={ props.zipChanged } value={ props.zipValue } placeholder="Try 10016" />
      {/* <p>You entered: { props.zipValue }</p> */}
    </div>);
}


class App extends Component {
  // Store value that is provided by the user
  state = {
    userInputValue: "",
    cities: []
  }

  handleZipChange(event) {
    // console.log(event.target.value);
    this.setState({
      userInputValue: event.target.value
    })

    if (event.target.value.length !== 5) {
      return;
    }
    else {
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          cities: json
        })
      })
      .catch(error => {console.log(error)
        this.setState({
          cities: []
        })
      })
    }
    
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
          {(cityArray.length === 0) ? (<div className="text-center mt-2">No Results</div>) : cityArray}
        </div>
      </div>
    );
  }
}

export default App;

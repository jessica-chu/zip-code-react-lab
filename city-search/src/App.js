import React, { Component } from 'react';
import './App.css';

function City(props) {
  return (
    <div className="card w-50 center my-3">
      <div className="card-header">
        {props.locationText}
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

function ZipCode(props) {
  const cityInfo = [];
    
  // Create an array of <City /> elements
  for (let i = 0; i < props.cityArray.length; i++) {
    const isCity = props.cityArray[i];

    cityInfo.push (
      <City
        key = {i}
        locationText = {isCity['LocationText']}
        state = {isCity['State']}
        location = {isCity['Lat'] + ", " + isCity['Long']}
        estimatedPop = {isCity['EstimatedPopulation']}
        totalWages = {isCity['TotalWages']}
      />
    )
  }
  
  return (
    <div>
      <div className="h5 text-center mt-4">
        Zip Code: {props.zipCode}
      </div>
      {cityInfo}
    </div>
    );
}

function CitySearchField(props) {
  return (
    <div className="text-center mt-4">
      <strong>City:</strong>
      <input type="text" onChange={ props.changed } value={ props.value } placeholder="Try SPRINGFIELD" />
      {/* <p>You entered: { props.value }</p> */}
    </div>);
}


class App extends Component {
  // Store value that is provided by the user
  state = {
    userInputValue: "",
    results: []
  }

  handleCityChange(event) {
    // console.log(event.target.value);
    this.setState({
      userInputValue: event.target.value
    })

    let zipInfo = [];
    let zipArray = [];
    
    fetch('http://ctp-zip-api.herokuapp.com/city/' + (event.target.value).toUpperCase())
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        // this.setState({
        //   results: json
        // })
        zipInfo = json;
        for (let i = 0; i < zipInfo.length; i++) {
          zipArray.push(
            fetch('http://ctp-zip-api.herokuapp.com/zip/' + zipInfo[i])
              .then(response => response.json())
          )
        }
        return Promise.all(zipArray);
      })
      .then(data => {
        let results = [];

        for (let i = 0; i < data.length; i++)
          results.push([])
        
        this.setState({results: data})
      })
      .catch(error => {console.log(error)
        this.setState({
          results: []
        })
      })  
  }

  render() {
    const results = this.state.results;
    const resultsArray = [];
    
    // Create an array of <ZipCode /> elements
    for (let i = 0; i < results.length; i++) {
      resultsArray.push (
        <ZipCode
          key = {i}
          zipCode = {results[i][0]['Zipcode']}
          cityArray = {results[i]}
        />
      )
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField changed={ (e) => this.handleCityChange(e) } value={ this.state.userInputValue } />
        <div>
          {(resultsArray.length === 0) ? (<div className="text-center mt-2">No Results</div>) : resultsArray}
        </div>
      </div>
    );
  }
}

export default App;

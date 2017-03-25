import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))// URL that TestRPC is running on

var peopleContractABi = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}]

var peopleContractAddress = '0x48e43d05dac22e6976b111d52e589892c5fc9e35'

var peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABi).at(peopleContractAddress)


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }


  componentWillMount() {
    var data = peopleContract.getPeople()
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    })
  }
  
  render() {
    var TableRows = []
    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
          <tr>
            <td>(ETHEREUM_CLIENT.toAscii( firstname: this.state.firstnames[index]) )</td>
            <td>(ETHEREUM_CLIENT.toAscii( lastName: this.state.lastNames[index]) )</td>
            <td>(age: this.state.ages[index])</td>
          <tr>
        )
    })
    
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-Content">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
            {TableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

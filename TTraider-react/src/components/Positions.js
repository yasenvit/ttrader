import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import PositionItem from '../util/PositionItem'



class Positions extends Component {
state={
    positions: null ,
    error:"ERROR"
}
getPositions () {
    const endpoint = "/api/" + window.sessionStorage.getItem("apikey") + "/positions"
    const promise = apiCall(endpoint,'get')
    promise.then(blob => blob.json()).then (json=> {
        this.setState({
            positions: json.positions
        })
    })
}

render() {
    let positionsList = (<div></div>)
    if (this.state.positions !==null) {
        positionsList = (
            <div>
                <PositionItem positions={this.state.positions}/>
            </div>
        )
    }
   
    return (
        <div>
            <div>
                <h3>Active Positions:</h3>
            </div>
            <div>
                {positionsList}
            </div>
        </div>
    )
}

componentDidMount() {    
    if(this.state.positions === null){
        this.getPositions()
    }
  }
}

export default Positions
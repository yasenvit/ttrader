import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Nav.css';

class PositionFor extends Component {
    state = {
        ticker: null,
        shares: null
        }
    getPositionFor(inptticker) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/position_for/${inptticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                    ticker: json.ticker,
                    shares: json.shares
                })
              })
    }
    render() {        
        let positionList=(<div></div>)
        if (this.state.shares !== null) {
            positionList = (
                <div>
                   Ticker '{this.state.ticker}' - {this.state.shares} shares
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h3>Position for </h3>
                    <input className="input" id="ticker" placeholder="ticker"/>
                    <button className="myButton" onClick = {(event)=> {
                        this.getPositionFor(document.getElementById('ticker').value)
                    }}
                    > show </button>
                </div>
                <div>

                    {positionList}

                </div>                              
            </div>
        )
    }   
}
export default PositionFor
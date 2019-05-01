import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import TradeItem from '../util/TradeItem';

class Trades extends Component {
    state={
        trades: null,
        error: "ERROR"
    }
    getTrades () {
        const endpoint = "/api/" + window.sessionStorage.getItem("apikey") + "/trades"
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
                this.setState({
                trades: json.trades
            })
        })
    } 
        render() {
        let tradesList = (<div></div>)  
        if (this.state.trades !==null) {
            tradesList = (
                <div>
                    <TradeItem trades={this.state.trades}/>
                </div>
            )
        }  
        return (
            <div>
                <h3>Trades History </h3>
                <div>
                    {tradesList}
                </div>
            </div>
        )
    }
    componentDidMount() {        
        if(this.state.trades === null){
            this.getTrades()
        }
    }
}

export default Trades
import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import NewsItem from '../util/NewsItem';
import '../Nav.css'

class TickerLookup extends Component {
    state = {
        price: null,
        ticker: null,
        open: null,
        close: null,
        high: null,
        low: null,
        volume: null,
        change: null,
        changePercent: null,
        date: null                   
    }
    getPrice(ticker) {
        const endpoint = `/api/price/${ticker}`
        const promise = apiCall(endpoint)
        promise.then(blob=>blob.json()).then (json=> {
            this.setState ({
                price: json.price,
                ticker: json.ticker
            })
        })
    }
    getRecent(ticker) {
        const endpoint = `/api/stock/${ticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({                        
                        open: json.open,
                        close: json.close,
                        high: json.high,
                        low: json.low,
                        volume: json.volume,
                        change: json.change,
                        changePercent: json.changePercent,
                        date: json.date                        
                  })
              })
    }
    getNews(ticker) {
        const endpoint = `/api/news/${ticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({                        
                        news: json
                  })
              })
    }
    render() {
        const roundTo = require('round-to')
        let showPrice = (<div></div>)
        let recentActivity = (<div></div>)        
        if (this.state.price !== null) {
            showPrice = (
                <div>
                    <div>
                        <ul>
                            <li type='circle' >Current price for ticker '{this.state.ticker}' is ${this.state.price} per share</li>
                        </ul>
                    </div>
                    <div>
                        <button className="myButton" onClick = {(event)=> {
                            this.getRecent(document.getElementById('ticker').value)
                        }}
                        > show latest activity</button>
                    </div>
                </div>
            )
        let news = (<div></div>)
        if (this.state.news !== null) {
            news = (
                <div>
                    <h4>Related News</h4>
                    <NewsItem items = {this.state.news}/>
                </div>
            )
        }
        if (this.state.change !== null) {
            recentActivity = (                                  
                    <div >
                        <ul>
                            <li>Ticker: {this.state.ticker}</li>
                            <li>Date:   {this.state.date}</li>
                            <li>Volume: {this.state.volume}</li>
                            <li>Price (open): ${this.state.open} / Price (close): ${this.state.close}</li>
                            <li>Lowest Price: ${this.state.low} / Highest Price: ${this.state.high}</li>
                            <li>Price change: ${roundTo(this.state.change,2)} / Price change : {roundTo(this.state.changePercent,2)}%</li>
                        </ul>
                        {news}
                    </div>
                )
            }
        }
        return (
            <div>
                <div>
                    <h3>Stock info</h3>
                    <input className="input" id="ticker" placeholder="ticker"/>
                    <button className="myButton" onClick = {(event)=> {
                        this.getPrice(document.getElementById('ticker').value)
                        this.getNews(document.getElementById('ticker').value)
                    }}
                    > show </button>
                </div>
                <div>
                    
                    {showPrice}

                </div>
                <div>
                    
                    {recentActivity}
                    
                </div>                    
            </div>
        )
    }
}
export default TickerLookup
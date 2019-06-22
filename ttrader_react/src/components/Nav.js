import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../Style.css';

class Nav extends Component {
    render() {
        return (
                <ul id="nav">
                    
                    <li><Link to="/balance"> Balance </Link></li>
                    <li><Link to="/deposit"> Make Deposit </Link></li>
                    <li><Link to="/positions"> Positions </Link></li>
                    <li><Link to="/positionfor"> Position for </Link></li>
                    <li><Link to="/sell"> Sell </Link></li>
                    <li><Link to="/buy"> Buy </Link></li>
                    <li><Link to="/trades"> Trades History</Link></li>
                    <li><Link to="/tradesfor"> Trades for</Link></li>
                    <li><Link to="/stock"> Ticker Lookup</Link></li>
                    <li><Link to="/mostactive"> Top-10 - Most active</Link></li>
                    <li><Link to="/gainers"> Top-10 - Gainers</Link></li>
                    <li><Link to="/losers"> Top-10 - Losers</Link></li>
                    <li><Link to="/iexvolume"> Top-10 - IEX volume</Link></li>
                    <li><Link to="/iexpercent"> Top-10 - IEX percent</Link></li>
                    <li><Link to="/infocus"> Top-10 - Infocus</Link></li>
                </ul>
       )
    }
}
export default Nav
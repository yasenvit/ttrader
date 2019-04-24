import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Nav extends Component {
    render() {
        return (

              <ul id="leftNavigation">
                <li class="active">
                    <Link to="/balance"> View Balance </Link>
                    <ul>                        
                        <li><Link to="/balance"> Account cash balance </Link></li>
                        <li><Link to="/deposit"> Make Deposit </Link></li>
                        <li><Link to="/balance"> Positions </Link></li>
                        <li><Link to="/positionposition_for/<symbol>"> Position for </Link></li>
                    </ul>
                </li>
                <li class="active">
                    <Link to="/trades"> Trades </Link>
                    <ul>
                        <li><Link to="/sell"> Sell </Link></li>
                        <li><Link to="/buy"> Buy </Link></li>
                        <li><Link to="/trades"> Trades History</Link></li>
                        <li><Link to="trades_for/<symbol>"> Trades for</Link></li>
                    </ul>
                </li>
                <li class="active">
                    <Link to="<criteria>"> Top-10 Tickers </Link>
                    <ul>
                        <li><Link to="/mostactiv"> Top-10 - Most active</Link></li>
                        <li><Link to="/gainers"> Top-10 - Gainers</Link></li>
                        <li><Link to="/losers"> Top-10 - Losers</Link></li>
                        <li><Link to="/iexvolume"> Top-10 - IEX volume</Link></li>
                        <li><Link to="/iexpercent"> Top-10 - IEX percent</Link></li>
                        <li><Link to="/infocus"> Top-10 - Infocus</Link></li>
                    </ul>
                </li>
                <li class="active">
                    <Link to="#"> Contact us</Link>
                </li>
            </ul>
        
        )
    }
}

export default Nav
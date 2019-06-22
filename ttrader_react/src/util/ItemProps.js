import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import '../Style.css';

class ItemProps extends Component {
    render() {
        const linkBuy = `/buy/${this.props.item.symbol}`
        const linkSell = `/sell/${this.props.item.symbol}`
        const roundTo = require('round-to')  
        return (
            <tr>
                <td width="10%" >{this.props.item.latestTime}</td>
                <td width="5%" >{this.props.item.symbol}</td>
                <td width="20%">{this.props.item.companyName}</td>
                <td width="10%">{this.props.item.sector}</td>
                <td width="7%" ><CurrencyFormat value={this.props.item.low} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>
                <td width="7%" ><CurrencyFormat value={this.props.item.high} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>                
                <td width="7%"><CurrencyFormat value={this.props.item.latestPrice} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>
                <td width="7%"><CurrencyFormat value={roundTo(this.props.item.ytdChange,2)} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>
                <td width="7%">{this.props.item.latestVolume}</td>
                <td width="5%"><Link to={linkBuy}><button className="smallButton" type="button">Buy</button></Link></td>
                <td width="5%"><Link to={linkSell}><button className="smallButton" type="button">Sell</button></Link></td>
            </tr>
        )
    }
}
export default ItemProps
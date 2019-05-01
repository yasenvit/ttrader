import React, {Component} from 'react';
import apiCall from './apiCall';


class ItemProps extends Component {
    
    render() {        
       return (
        <div style={itemStyle}>
            <div>Ticker '{this.props.item.symbol}' | Company Name: {this.props.item.companyName} | Sector
            : {this.props.item.sector} | Latest Price: {this.props.item.latestPrice} | Change
            : {this.props.item.change} | Latest Volume: {this.props.item.latestVolume}</div>
        </div>
            )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default ItemProps
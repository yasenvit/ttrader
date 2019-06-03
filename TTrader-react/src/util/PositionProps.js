import React, {Component} from 'react';
import '../Style.css';
import CurrencyFormat from 'react-currency-format';

class PositionProps extends Component {
    
    render() { 
        const roundTo = require('round-to')       
        return (
            <tr>
                <td width="15%" >{this.props.position.ticker}</td>
                <td width="15%" >{this.props.position.shares}</td>
                <td width="20%" ><CurrencyFormat value={roundTo(this.props.position.investCost,2)}displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                <td width="20%" ><CurrencyFormat value={roundTo(this.props.position.currentCost,2)}displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                <td width="20%" ><CurrencyFormat value={roundTo(this.props.position.marginPercentage,2)}displayType={'text'}
                thousandSeparator={true} prefix={'%'}/></td>
            </tr>
        )
    } 
}
export default PositionProps
import React, {Component} from 'react';

class PositionProps extends Component {
    
    render() {        
       return (
           <div style={itemStyle}>
                <div>Ticker '{this.props.position.ticker}' - {this.props.position.shares} shares</div>
            </div>
            )
    } 
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default PositionProps
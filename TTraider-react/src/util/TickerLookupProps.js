import React, {Component} from 'react';

class TickerLookupProps extends Component {
    
    render() {
        
       return (
           <div style={itemStyle}>
                <li>{this.props.point} : {this.props.value}</li>
            </div>
            )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default TickerLookupProps
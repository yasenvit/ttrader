import React, {Component} from 'react';

class PositionProps extends Component {
    
    render() {        
       return (
        <table className="table">
            <tr>
                <td width="20%" >Ticker:</td>
                <td width="20%" >{this.props.position.ticker}</td>
                <td width="20%" >Shares:</td>
                <td width="20%" >{this.props.position.shares}</td>
            </tr>
        </table>
            )
    } 
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default PositionProps
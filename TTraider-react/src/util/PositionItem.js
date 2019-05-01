import React, {Component} from 'react';
import PositionProps from './PositionProps'


class PositionItem extends Component {
   
    render() {
        
       return this.props.positions.map((position, index)=> (
            <div><PositionProps key={index} position={position} /></div>
        ))
        
    }
}

export default PositionItem
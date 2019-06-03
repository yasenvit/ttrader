import React, {Component} from 'react';
import PositionProps from './PositionProps';


class PositionItem extends Component {
   
    render() {
        
       return this.props.positions.map((position, index)=> (
            <PositionProps key={index} position={position} />
        ))
        
    }
}
export default PositionItem
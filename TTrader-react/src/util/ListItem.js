import React, {Component} from 'react';
import ItemProps from './ItemProps'


class ListItem extends Component {
   
    render() {
        
       return this.props.items.map((item, index)=> (
            <ItemProps key={index} item={item} />
        ))
        
    }
}

export default ListItem
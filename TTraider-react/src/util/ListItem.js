import React, {Component} from 'react';
import ItemProps from './ItemProps'


class ListItem extends Component {
   
    render() {
        
       return this.props.items.map((item, index)=> (
            <div><ItemProps key={index} item={item} /></div>
        ))
        
    }
}

export default ListItem
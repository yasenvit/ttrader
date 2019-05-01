import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem'

class Iexvolume extends Component {
    state = {
        iexvolumes: null
    }
    getIexvolume() {
        const endpoint = "/api/get_ten/iexvolume"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      iexvolumes : json.iexvolume
                  })
              })
    }
    render() {
        let iexvolumesList = (<div></div>)
        if (this.state.iexvolumes !==null) {
            iexvolumesList = (
                <div>
                    <ListItem items={this.state.iexvolumes}/>
                </div>
            )}    
        return (
            <div>
                <h3>Top-10 IEX Volume stocks</h3>
                {iexvolumesList}                
            </div>
        )
        }    
    componentDidMount() {        
        if(this.state.iexvolumes === null){
            this.getIexvolume()
        }
    }
}
export default Iexvolume
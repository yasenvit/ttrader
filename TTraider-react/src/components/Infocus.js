import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem'

class Infocus extends Component {
    state = {
        infocuses: null
    }
    getInfocus() {
        const endpoint = "/api/get_ten/infocus"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      infocuses : json.infocus
                  })
              })
    }
    render() {
        let infocusesList = (<div></div>)
        if (this.state.infocuses !==null) {
            infocusesList = (
                <div>
                    <ListItem items={this.state.infocuses}/>
                </div>
            )}    
        return (
            <div>
                <h3>Top-10 Infocus stocks</h3>
                {infocusesList}                
            </div>
        )
        }    
    componentDidMount() {        
        if(this.state.infocuses === null){
            this.getInfocus()
        }
    }
}

export default Infocus
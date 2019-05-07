import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem'

class Gainers extends Component {
    state = {
        gainers: null
    }
    getGainers() {
        const endpoint = "/api/get_ten/gainers"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      gainers : json.gainers
                  })
              })
    }
    render() {
        let gainersList = (<div></div>)
        if (this.state.gainers !==null) {
            gainersList = (
                <div>
                <ListItem items={this.state.gainers}/>
            </div>
            )}    
        return (
            <div>
                <h3>Top-10 Gainers stocks</h3>
                
                    {gainersList}  
                                            
            </div>
        )
        }    
    componentDidMount() {        
        if(this.state.gainers === null){
            this.getGainers()
        }
    }
}
export default Gainers
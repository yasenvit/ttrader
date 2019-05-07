import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem'

class Iexpercent extends Component {
    state = {
        iexpercents: null
    }
    getIexpercent() {
        const endpoint = "/api/get_ten/iexpercent"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      iexpercents : json.iexpercent
                  })
              })
    }
    render() {
        let iexpercentsList = (<div></div>)
        if (this.state.iexpercents !==null) {
            iexpercentsList = (
                <div>
                    <ListItem items={this.state.iexpercents}/>
                </div>
            )}    
        return (
            <div>
                <h3>Top-10 IEX percent stocks</h3>
                
                {iexpercentsList}                
            </div>
        )
        }    
    componentDidMount() {        
        if(this.state.iexpercents === null){
            this.getIexpercent()
        }
    }
}
export default Iexpercent
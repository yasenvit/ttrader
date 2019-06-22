import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem';
import '../Style.css';

class Gainers extends Component {
    state = {
        gainers: [],
        error : ""
    }
    getGainers() {
        const endpoint = "/api/get_ten/gainers"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      gainers : json.gainers,
                      error : json.error,
                      statusCode: json.statuscode
                  })
              })
    }
    render() {
        let gainersList = (<div></div>)
        if(this.state.error !== undefined) {
            gainersList = (
                <div>
                    <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                </div>
            )} else {
            gainersList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            Top-10 Gainers stocks
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="10%" >Date</th>
                                <th width="5%" >Ticker</th>
                                <th width="20%" >Company Name</th>
                                <th width="10%" >Sector</th>
                                <th width="7%" >Lowest Price</th>
                                <th width="7%" >Highest Price</th>
                                <th width="7%" >Latest Price</th>
                                <th width="7%" >Year To Date Change</th>
                                <th width="7%" >Latest volume</th>
                                <th width="5%"></th>
                                <th width="5%"></th>
                            </tr>
                            <ListItem items={this.state.gainers}/>
                        </table>
                    </div>
                </div>
            )} 
        return (
            <div>
                {gainersList}
            </div>
        )
    }    
    componentDidMount() {        
        if(this.state.error === ""){
            this.getGainers()
        }
    }
}
export default Gainers
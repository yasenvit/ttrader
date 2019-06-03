import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem';
import '../Style.css';

class Iexpercent extends Component {
    state = {
        iexpercent: [],
        error : ""
    }
    getIexpercent() {
        const endpoint = "/api/get_ten/iexpercent"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      iexpercent : json.iexpercent,
                      error: json.error,
                      statusCode: json.statuscode
                  })
              })
    }
    render() {
        let iexpercentList = (<div></div>)
        if (this.state.error !== undefined) {
            iexpercentList = (
                <div>
                    <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                </div>
            )
        } else {
            iexpercentList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            Top-10 IEX percent stocks
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1s"}}>
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
                            <ListItem items={this.state.iexpercent}/>
                        </table>
                    </div>
                </div>
            )}    
        return (
            <div>
                {iexpercentList}
            </div>
        )
    }    
    componentDidMount() {        
        if(this.state.error === ""){
            this.getIexpercent()
        }
    }
}
export default Iexpercent
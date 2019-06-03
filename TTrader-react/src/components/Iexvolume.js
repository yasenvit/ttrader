import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem';
import '../Style.css';

class Iexvolume extends Component {
    state = {
        iexvolume: [],
        error : ""
    }
    getIexvolume() {
        const endpoint = "/api/get_ten/iexvolume"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      iexvolume : json.iexvolume,
                      error: json.error,
                      statusCode: json.statuscode
                  })
              })
    }
    render() {
        let iexvolumeList = (<div></div>)
        if (this.state.error === undefined) {
            iexvolumeList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            Top-10 IEX volume stocks
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
                            <ListItem items={this.state.iexvolume}/>
                        </table>
                    </div>
                </div>
            )} else {
                if (this.state.error.length > 0) {
                iexvolumeList = (
                    <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                )}
            }   
        return (
            <div>
                {iexvolumeList}
            </div>
        )
    }    
    componentDidMount() {        
        if(this.state.error === ""){
            this.getIexvolume()
        }
    }
}
export default Iexvolume
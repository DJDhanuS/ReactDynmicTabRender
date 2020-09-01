import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Glyphicon,
    Row,
} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import SearchComponent from './search'
import ShowDetailsModal from './showDetailsModal'
import {
    DEFAULT_SEARCH,
    DETAIL_SEARCH,
} from "../utils/ActionTypes";

class CertificateSearch extends React.Component {
    state = {
        data: [],
        details:[],
        showModal:false
    };

    componentWillMount() {
        let configHeadersIAM = {
            headers: {
                accept: "application/json",
                authorization: `Intuit_IAM_Authentication intuit_appid="Intuit.platform.iam.pauth"  ,intuit_app_secret="preprdZ9TkjIOJ4bQQslTdOzBxmlAYca8wG7ZPHB" ,intuit_token_type="IAM-Ticket"`,
                'content-type': "application/json",
                intuit_appid: "Intuit.cto.iam.partnerauth.test",
                intuit_country: "US",
                intuit_local: "en-US",
                intuit_offeringid: "Intuit.cto.iam.partnerauth.test",
                intuit_originatingip: "127.0.0.1",
                intuit_token_type: "IAM-Ticket",
                'cache-control': "no-cache",
                'postman-token': "0e701edc-3c65-2d71-b497-17a2a480dfb3"
            }
        };
        axios.get("http://localhost:3000/certificates\n").then((response) => {
            this.props.dispatch({type:DEFAULT_SEARCH, payload: response.data});
            this.setState({
                data:  response.data
            });
        }).catch((error) => {
          console.log(error)
        });

        const data = {"username": "intuitssoiamtestpass", "password": "Intuit@123"};
        axios.post('https://accounts-e2e.platform.intuit.com/v1/iamtickets/sign_in', data, configHeadersIAM).then(function (response) {
            alert('yeah!');
            console.log(response);
        }).catch(function (error) {
                // alert('oops');
                console.log(error);
            })
    }

    createCertificate = () => {
        console.log('Hi');
    };

    setDateFormate = (value) => {
        const expiryDate = new Date(value);
        return expiryDate.toLocaleString()
    };

    showModal = (value) => {
        let details = {};
        axios.get(`http://localhost:3000/certificateDetails/${value}`).then((response) => {
            this.props.dispatch({type:DETAIL_SEARCH, payload: response.data});
            details = response.data;
            console.log("Details", response.data)
        }).catch((error) => {
            console.log(error)
        });

        this.setState({
            details:details,
            showModal: !this.state.showModal
        })
    };

    renderButton = (value) => {
        return(
            <div>
                <Button className="btn btn-md btn-link" onClick={()=>this.showModal(value)}>Details</Button>
                <Button className="btn btn-md btn-link">
                    <span className="glyphicon glyphicon-download-alt">Download</span>
                </Button>
            </div>


        )
    };

     complexSearch = (value) => {
         let filterData;
         const keys = Object.keys(value);
         if (keys.length > 1) {
             if (keys.length === 2) {
                 filterData = this.props.certificates.data.filter(x => x[keys[0]].indexOf(value[keys[0]]) > -1).filter(x => x[keys[1]].indexOf(value[keys[1]]) > -1);
             } else if (keys.length === 3) {
                 filterData = this.props.certificates.data.filter(x => x[keys[0]].indexOf(value[keys[0]]) > -1).filter(x => x[keys[1]].indexOf(value[keys[1]]) > -1).filter(x => x[keys[2]].indexOf(value[keys[2]]) > -1);
             } else if (keys.length === 4) {
                 filterData = this.props.certificates.data.filter(x => x[keys[0]].indexOf(value[keys[0]]) > -1)
                     .filter(x => x[keys[1]].indexOf(value[keys[1]]) > -1)
                     .filter(x => x[keys[2]].indexOf(value[keys[2]]) > -1)
                     .filter(x => x[keys[3]].indexOf(value[keys[3]]) > -1)
             }
             this.setState({
                 data: filterData
             })
         }else if (keys.length === 0) {
             filterData = this.props.certificates.data;
             this.setState({
                 data: filterData
             })
         } else {
             filterData = this.props.certificates.data.filter(x => x[keys[0]].indexOf(value[keys[0]]) > -1);
             this.setState({
                 data: filterData
             })
         }
     };
    simpleSearch = (key, value) => {
        if(key && value){
            let eventValue = key === "status" ? value.toUpperCase() : value;
            const fliteredData = this.props.certificates.data.filter(x => x[key].indexOf(eventValue) > -1);
            this.setState({
                data : fliteredData
            })
        }else {
            this.setState({
                data : this.props.certificates.data
            })
        }
    };

    render() {
        return (
            <div>
                <ShowDetailsModal show={this.state.showModal} data={this.state.details}
                                  showModal={this.showModal}/>
                <Row style={{padding: "20px"}}>
                    <Row className="inline-form" style={{marginTop: "0.5rem"}}>
                        <Button className="btn btn-sm btn-success" onClick={this.createCertificate}>
                            <Glyphicon glyph="plus"/> Create Certificate
                        </Button>
                    </Row>
                    <Row>
                        {this.state.data !== undefined ?
                            <SearchComponent
                                data={this.state.data}
                                search={this.simpleSearch}
                                complexSearch = {this.complexSearch}
                            /> : <span/>
                        }
                    </Row>
                    <Row>
                        {this.state.data !== undefined?
                        <BootstrapTable data={this.state.data}
                                        tableBodyClass='react-bs-table-bordered provider-search-result-table'
                                        hover
                                        striped
                                        pagination>
                            <TableHeaderColumn dataField="id" isKey width="20%" style={{backgroundColor: "#fff"}}>Partner Certificate ID</TableHeaderColumn>
                            <TableHeaderColumn dataField="cname" width="20%" style={{backgroundColor: "#fff"}}>Host Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="created" dataSort={ true } width="12%" dataFormat={this.setDateFormate} style={{backgroundColor: "#fff"}}>Isuue
                                Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="expiry" width="12%" dataSort={ true } dataFormat={this.setDateFormate} style={{backgroundColor: "#fff"}}>Expiry
                                Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="status" dataFormat={this.getStatusInfo} width="10%"
                                               dataAlign="center" style={{backgroundColor: "#fff"}}>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField="id"  dataFormat={this.renderButton} width="16%" style={{backgroundColor: "#fff"}}>
                                Action
                            </TableHeaderColumn>
                        </BootstrapTable>: <span/>}
                    </Row>
                </Row>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        certificates : state.certificate
    };
}

export default connect(mapStateToProps)(CertificateSearch);

import React from 'react';
import {
    Dropdown,
    MenuItem,
    FormControl,
    ControlLabel,
    Col,
    Button,
    Row,
    Glyphicon,
    Form,
    ButtonGroup,
    DropdownButton
} from 'react-bootstrap';
import {fetchKeyDescMapping,fetchTopKeys} from '../utils/searchUtils';

class ComplexSearch extends React.Component {
    state = {
        searchMenuFilter: '',
        searchMode: 'SIMPLE',
        value:'',
        providerComplexSearch: {
            keys: [{key: "cname", type: "text"},
                {key: "created", type: "text"},
                {key: "expiry", type: "text"},
                {key: "status", type: "text"}],
            filters:{}
        },
        startDate:''
    };

    searchModeDropdown = () => {
        let mode = this.state.searchMode;
        let buttontitle = '';
        let btStyle = {marginRight: '10px'};
        if (mode === 'SIMPLE') {
            buttontitle = 'Simple Search';
        } else if (mode === 'COMPLEX') {
            buttontitle = 'Advanced Search';
        } else {
            buttontitle = 'Query Search';
        }

        return (
            <DropdownButton bsStyle="primary" style={btStyle} title={buttontitle} id="certificateID">
                <MenuItem onClick={() => this.setState({searchMode: 'SIMPLE',value:''})}>Simple Search</MenuItem>
                <MenuItem onClick={() => this.setState({searchMode: 'COMPLEX',value:''})}>Advanced Search</MenuItem>
                {/*<MenuItem onClick={() => this.setState({searchMode: 'QUERY'})}>Query Search</MenuItem>*/}
            </DropdownButton>
        );
    };

    fetchMenuItems = () => {
        const list = this.state.providerComplexSearch.keys;
        const descriptions = fetchKeyDescMapping();
        const topList = fetchTopKeys();
        let menu = [];
        menu.push(<MenuItem header disabled>
            <FormControl style={{width: '80%'}} placeholder='Type to search' type="text"
                         className="provider-search-box"
                         value={this.state.searchMenuFilter}
                         onChange={(event) => (this.setState({searchMenuFilter: event.target.value}))}/>
        </MenuItem>);
        menu.push(<MenuItem divider/>);

        if (!this.state.searchMenuFilter) {
            topList.forEach((elem, i) => {
                menu.push(<MenuItem eventKey={i} onClick={() => this.handleFilterAddition(elem)}>
                    <Row style={{paddingLeft: '20px'}}><span>{elem}</span></Row>
                    <Row style={{paddingLeft: '20px'}}>
                        <span className='text-muted' style={{fontSize: 'x-small'}}>{descriptions[elem]}</span>
                    </Row>
                </MenuItem>);
            });
            menu.push(<MenuItem divider/>);
        }
        let filteredList = list.filter((elem) => this.state.searchMenuFilter || !topList.includes(elem.key)).filter((elem) => (elem.key.includes(this.state.searchMenuFilter)));
        filteredList.forEach((elem, i) => {
            menu.push(<MenuItem eventKey={i + 7} onClick={() => this.handleFilterAddition(elem.key)}>
                <Row style={{paddingLeft: '20px'}}><span>{elem.key}</span></Row>
                <Row style={{paddingLeft: '20px'}}>
                    <span className='text-muted' style={{fontSize: 'x-small'}}>{descriptions[elem.key]}</span>
                </Row>
            </MenuItem>);
        });
        return menu;
    };
    handleFilterAddition = (keyName) => {
        let filterState = this.state.providerComplexSearch.filters;
        filterState[keyName]='';
        const filterValue = {...this.state.providerComplexSearch, filterState};
        this.setState({
            providerComplexSearch : filterValue
        })
    };
    handleChange = (e) => {
        let filterState = this.state.providerComplexSearch.filters;
        let keyName = e.target.name;
        keyName==="status"?filterState[keyName] = e.target.value.toUpperCase(): filterState[keyName] = e.target.value;
        this.setState({
            providerComplexSearch: {...this.state.providerComplexSearch, filterState}
        });
        this.props.complexSearch(filterState)

        // if(e.target.name !=="expiry" && e.target.name!=="created"){
        //     this.props.search(e.target.name, e.target.value)
        // }else{
        //
        // }
    };

    handleFilterRemoval = (keyName) => {
        let filterState = this.state.providerComplexSearch.filters;
        delete filterState[keyName];
        this.setState({
            providerComplexSearch :{...this.state.providerComplexSearch, filterState}
        });
        this.props.complexSearch(filterState)

    };
    handleDateChange = (e) => {
        this.setState({
            startDate: e.target.value
        })
    };

    dateSearch = () => {
      console.log("")
    };

    renderFilterList = () => {
        let buttons = [];
        if (Object.keys(this.state.providerComplexSearch.filters).length>0) {
            Object.keys(this.state.providerComplexSearch.filters).forEach((elem, index) => {
                buttons.push(<div style={{display: 'inline'}}>
                    <ButtonGroup className="complex-search-term">
                        <Dropdown id="di">
                            <Dropdown.Toggle bsStyle="default" id="d1" noCaret className="complex-search-term"
                                             style={{marginLeft: "3px"}}>
                               <span>
                                   <span>{elem + ": "}</span>
                                   <span className="font-weight-bold">
                                       {(this.state.providerComplexSearch.filters[elem] ? '('+this.state.providerComplexSearch.filters[elem]+')' : '')}
                                   </span>
                               </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="d2">
                                <MenuItem header disabled>
                                    <ControlLabel style={{marginRight: '10px', color: 'black'}}>{elem}</ControlLabel>
                                    {elem === "created" || elem === "expiry" ?
                                        <div>
                                            <FormControl type="text" name={elem} className="provider-search-box"
                                                         value={this.state.startDate}
                                                         placeholder="dd/mm/yyy"
                                                         onChange={(e) => this.handleDateChange(e)}/>
                                            <button name={elem} className="btn-primary btn-sm"
                                                    style={{marginLeft: "5px"}}
                                                    onClick={this.dateSearch}>Search
                                            </button>
                                        </div>

                                        :
                                        <FormControl type="text" name={elem} className="provider-search-box"
                                                     value={this.state.providerComplexSearch.filters[elem]}
                                                     placeholder={elem === "created" || elem === "expiry" ? "dd/mm/yyy" : "Enter value"}
                                                     onChange={(e) => this.handleChange(e)}/>
                                    }
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="complex-search-term"
                                style={{padding: "5px"}}
                                onClick={() => this.handleFilterRemoval(elem)}><Glyphicon glyph="remove-sign"/></Button>
                    </ButtonGroup>
                    {
                        index !== (Object.keys(this.state.providerComplexSearch.filters).length - 1) ?
                            <span className="font-weight-bold" style={{padding: "10px", marginRight: "-5px"}}>AND</span>
                            : <span/>
                    }
                </div>);
            });
        }
        return buttons;
    };
    searchCertificate = (e) =>{
        this.setState({
            value:e.target.value
        });
        this.props.search("cname", e.target.value)
    };

    render() {
        return (this.state.searchMode === 'SIMPLE' ? (
            <Form inline>
                <Col lg={12} md={12} sm={12} xs={12} style={{display: "inline-block", padding: "0"}}>
                    <ControlLabel className="inline-control-label">Search Certificate</ControlLabel>
                    <div>
                        <div className="input-loader">
                            <div style={{
                                display: "inline-block",
                                position: "relative",
                                width: "100%"
                            }}>
                                {this.searchModeDropdown()}
                                <FormControl
                                    style={{width: "80%"}}
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Host Name"
                                    onChange={(event) => this.searchCertificate(event)}
                                    className="provider-search-box"/>
                            </div>
                        </div>
                        <div className="input-loading-container">
                            {
                                this.props.data.length > 0 ?
                                    <div className="input-loading"/>
                                    : <div className="input-loading-hidden"/>
                            }
                        </div>
                    </div>
                </Col>
            </Form>
        ) : (this.state.searchMode === 'COMPLEX' ?
            (<Form inline>
                    <Col lg={10} md={10} sm={10} xs={12} style={{padding: "0"}}>
                        <ControlLabel className="inline-control-label">Search
                            Certificate</ControlLabel>
                        <div>
                            <div className="input-loader">
                                {this.searchModeDropdown()}
                                <Dropdown id="d">
                                    <Dropdown.Toggle bsStyle="primary" id="d1">
                                        Add Filters
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu id="d2"
                                                   style={{
                                                       overflowY: 'scroll',
                                                       maxHeight: '300px',
                                                       minWidth: '650px',
                                                       maxWidth: '800px'
                                                   }}>
                                        {this.fetchMenuItems()}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {this.renderFilterList()}
                            </div>
                            <div className="input-loading-container">
                                {
                                    this.props.data.length > 0 ?
                                        <div className="input-loading"/>
                                        : <div className="input-loading-hidden"/>
                                }
                            </div>
                        </div>
                    </Col>
                </Form>
            ) :
            (<Form inline>
                    <Col lg={10} md={10} sm={10} xs={12}
                         style={{display: "inline-block", padding: "0"}}>
                        <ControlLabel className="inline-control-label">Search Certificate by Query</ControlLabel>
                        <div>
                            <div className="input-loader">
                                <div style={{
                                    display: "inline-block",
                                    position: "relative",
                                    width: "100%"
                                }}>
                                    {this.searchModeDropdown()}
                                    <FormControl
                                        style={{width: "88%"}}
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter query to search certificates. Eg: host.name:abc"
                                        onChange={(event) => this.searchCertificate(event)}
                                        className="provider-search-box"/>
                                </div>
                            </div>
                            <div className="input-loading-container">
                                {
                                    this.props.data.length > 0 ?
                                        <div className="input-loading"/>
                                        : <div className="input-loading-hidden"/>
                                }
                            </div>
                        </div>
                    </Col>
                    <Col lg={1} md={1} sm={2} xs={2} style={{display: "inline", marginTop: "1.5%"}}>
                        <Button bsStyle="primary" style={{marginRight: "10%", float: 'right'}}
                                // onClick={() => this.searchProviderByQuery()}
                        >Search</Button>
                    </Col>
                </Form>
            )));
    }

}
export default ComplexSearch;

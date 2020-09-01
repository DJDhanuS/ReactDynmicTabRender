import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import {
    Glyphicon,
    Nav,
    NavItem,
    Navbar,
    Grid,
    Modal,
    Row,
    Col,
    Button,

} from 'react-bootstrap';
import {getRouterPath, getNavbarTabPath, getHashRouterPath} from "../utils/utils";
import { paths, getRouteMap } from '../utils/routerPath';



class NavbarRouter extends React.Component{

    getHomeTab = () => {
        let path = getNavbarTabPath(this.props.location.pathname);
        let selected = path === paths.root || path === paths.rootWithSlash;
        return (
            <NavItem className={selected ? "Home selected" : "Home"} key={getRouterPath(paths.root)}
                     href={getRouterPath(paths.root)}>
                <Glyphicon glyph="home" style={{ color: "white" }} /><b style={{ color: "white",marginLeft:'10px' }}>Certificates List</b>
            </NavItem>
        );
    };

    getTabs = () => {
        let pathComponents = new Map();
        pathComponents.set(paths.root, this.getHomeTab());
        let tabs = [];
        [...getRouteMap().keys()].map(path => {
            if (pathComponents.has(path))
                tabs.push(pathComponents.get(path));
        });
        return tabs;
    };

    getNavbarTabs() {
        return (
            <Nav pullRight>
                {this.getTabs()}
            </Nav>
        );
    }

    // getNavbarHeader() {
    //     // For external tax partner user, the navbar should contain the
    //     // name of the provider the user is authorized for.
    //     // This should be accessed from the redux store.
    //     return (
    //         <Navbar.Header>
    //             {
    //                 <Nav>
    //                     <NavItem>
    //                         <Link to={getHashRouterPath("")} onClick={this.goToBrandingProviderView}>
    //
    //                         </Link>
    //                     </NavItem>
    //                 </Nav>
    //             }
    //         </Navbar.Header>
    //         )
    // }
    render() {
        return(
            <div>
                <div>
                    {/*<ReduxToastr timeOut={3000} newestOnTop={true} removeOnHover={true}*/}
                    {/*             position="top-right" transitionIn="fadeIn" transitionOut="fadeOut" />*/}
                </div>
                <Navbar id="provider-admin-navbar" staticTop={true}
                        style={{ backgroundColor: "#0077c5", position: "sticky", top: "0", zIndex: "3" }}>
                    {/*{this.getNavbarHeader()}*/}
                    {this.getNavbarTabs()}
                </Navbar>
                <Grid fluid className="App">
                    {this.props.children}
                </Grid>
            </div>
        )
    }

}
const mapStateToProps = state =>{
    return{
        state: state
    }
};
export default connect(mapStateToProps) (NavbarRouter);

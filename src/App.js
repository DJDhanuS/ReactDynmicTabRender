import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom';
import {getRouteMap} from '../src/utils/routerPath';
import {getHashRouterPath} from '../src/utils/utils';
import NavbarRouter from '../src/components/navbarRouter';
import './App.css';
import '../src/styles/App.css';
import '../src/styles/bootstrap.css'
// import CertificateSearch from "./components/CertificateSearch";
let logInfo;

class App extends React.Component {


    getRoutes() {
        let routes = getRouteMap();
        return [...routes.keys()].map(path => {
            return (
                <Route exact
                       path={getHashRouterPath(path)}
                       component={withRouter(routes.get(path))} key={path}/>
            )
        });
    }

    addHelpWikiLink() {
        let navBarElement = document.getElementById("PartnerAuthorizationCertificate");
        if (!navBarElement) {
            return;
        }
        let toolGuideLink = <a href="https://wiki.intuit.com/display/FDP/Provider+Administration+-+User+Guide"
                               target="_blank" onClick={() => {
            logInfo({
                message: "Provider Setup Documentation opened from provider admin",
                action: "viewSetupDocumentation"
            });
        }}>
            <strong>Provider Admin User Guide</strong>
        </a>;
        ReactDOM.render(toolGuideLink, navBarElement);
    }


    render() {
        return (
        <div style={{backgroundColor: "#f4f5f8", minHeight: "90vh"}}>
            {/*<CertificateSearch />*/}
            <HashRouter>
                <Route render={(props) => {
                    return (
                        <NavbarRouter location={props.location} history={props.history}>
                            <Switch>
                                {this.getRoutes()}
                            </Switch>
                        </NavbarRouter>
                    );
                }}/>
            </HashRouter>
        </div>
    )
    }
}

export default App;

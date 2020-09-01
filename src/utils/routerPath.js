import Certifiacte from '../components/CertificateSearch';
import store from "../store/Store";


export const paths = Object.freeze({
    root: "",
    rootWithSlash: "/",
});

export function getRouteMap() {
    let routeMap = new Map();
    let state = store.getState();
    // let permission = state.user.permissions
    routeMap.set(paths.root, Certifiacte);

    return routeMap;

}


// import Axios from 'axios';
// import Cookies from 'js-cookie';
//
//
// const envToEndPointsMap = {
//     "prod": "https://financialprovider.platform.intuit.com/v1",
//     "e2e": "https://financialprovider-e2e.platform.intuit.com/v1",
//     "qa": "https://financialprovider-qal.platform.intuit.com/v1",
//     "perf": "https://financialprovider-prf.platform.intuit.com/v1"
// };
//
// const _build_env = 'STR_REPLACE_ENV';
// const _build_rest_env = 'STR_REPLACE_REST_ENV';

import Axios from 'axios';
import Cookies from 'js-cookie';

const envToEndPointsMap = {
    "prod": "https://financialprovider.platform.intuit.com/v1",
    "e2e": "https://financialprovider-e2e.platform.intuit.com/v1",
    "qa": "https://financialprovider-qal.platform.intuit.com/v1",
    "perf": "https://financialprovider-prf.platform.intuit.com/v1"
};

const envToFDPToolsEndPointsMap = {
    "prod": "https://financialtools.api.intuit.com",
    "e2e": "https://financialtools-e2e.api.intuit.com",
    "qa": "https://financialtools-qal.api.intuit.com",
    "perf": "https://financialtools-aws-prf.api.intuit.com"
};

const envToAccessServiceEndPointsMap = {
    "prod": "https://accounts.platform.intuit.com/v1",
    "e2e": "https://accounts-e2e.platform.intuit.com/v1",
    "qa": "https://accounts-e2e.platform.intuit.com/v1",
    "perf": "https://accounts-e2e.platform.intuit.com/v1"
};

const envToAuthKeyMap = {
    "prod": "prdakyresQx7aoftTCFXlCt5mnWi8AUYmejWClkR",
    "e2e": "preprdakyresDIYjqbnKMoQYQI2VMrVmVttcYZca",
    "qa": "preprdakyresDIYjqbnKMoQYQI2VMrVmVttcYZca",
    "perf": "preprdakyresDIYjqbnKMoQYQI2VMrVmVttcYZca"
};

const envToPBIServiceEndPointsMap = {
    "prod": "https://processbulkimport.api.intuit.com",
    "e2e": "https://processbulkimport-e2e.api.intuit.com",
    "qa": "https://processbulkimport-e2e.api.intuit.com",
    "perf": "https://processbulkimport-e2e.api.intuit.com"
};

const envToScorecardEndPointsMap = {
    "prod": "https://cgds-log-processor.api.intuit.com/v1",
    "e2e": "https://cgds-log-processor-qal.api.intuit.com/v1",
    "qa": "https://cgds-log-processor-qal.api.intuit.com/v1",
    "perf": "https://cgds-log-processor-qal.api.intuit.com/v1"
};

const _build_env = 'STR_REPLACE_ENV';
const _build_rest_env = 'STR_REPLACE_REST_ENV';
let platformEnv = window.platform && window.platform.env;

if (_build_env === 'local') {
    Axios.defaults.headers.common.intuit_assetid = "8721238270590880011";
}

if (platformEnv === undefined || envToEndPointsMap[platformEnv] === undefined) {
    const windowLocation = window.location.href;
    if (windowLocation.indexOf("qa.ie") !== -1 || windowLocation.indexOf("dev") !== -1 || windowLocation.indexOf("localhost") !== -1) {
        platformEnv = "qa";
    } else if (windowLocation.indexOf("perf.ie") !== -1) {
        platformEnv = "perf";
    } else if (windowLocation.indexOf("e2e") !== -1) {
        platformEnv = "e2e";
    } else {
        platformEnv = "prod";
    }
}

const providerServiceRestEndPoint = envToEndPointsMap[platformEnv];
const providerAdminRestEndPoint = providerServiceRestEndPoint + '/provider-administration-web';

const financialToolsRestEndPoint = envToFDPToolsEndPointsMap[platformEnv];
const apiGateWayAuth = "Intuit_APIKey intuit_apikey=" + envToAuthKeyMap[platformEnv];

Axios.defaults.withCredentials = true;
Axios.defaults.headers.common.Authorization = apiGateWayAuth;
Axios.defaults.headers.common.intuit_offeringid = "Intuit.platform.financialprovider.provideradministration";
Axios.defaults.headers.common.um_realm = getUmRealm();


export function getBaseUrl() {
    if(_build_rest_env === 'local') {
        return "http://localhost:8080/provider-restservices";
    }
    return providerServiceRestEndPoint;
}

export function getFinancialToolsBaseUrl() {
    return financialToolsRestEndPoint;
}

export function getAccessServiceBaseUrl() {
    return envToAccessServiceEndPointsMap[platformEnv];
}

export function getPBIServiceBaseUrl() {
    return envToPBIServiceEndPointsMap[platformEnv];
}

export function getScorecardBaseUrl() {
    return envToScorecardEndPointsMap[platformEnv];
}

export function getUmRealm() {
    let cookieName = 'um_realm';
    switch(platformEnv) {
        case 'qa':
        case 'e2e':
            return Cookies.get(platformEnv + '.' + cookieName);
        case 'perf':
            return Cookies.get('prf.' + cookieName);
        default:
            return Cookies.get(cookieName);
    }
}

export function getDashUserGroup() {
    let cookieName = 'um_realmname';
    let cookieValue;
    switch(platformEnv) {
        case 'qa':
        case 'e2e':
            cookieValue = Cookies.get(platformEnv + '.' + cookieName);
            break;
        case 'perf':
            cookieValue = Cookies.get('prf.' + cookieName);
            break;
        default:
            cookieValue = Cookies.get(cookieName);
    }
    // decodeURIComponent is a built-in JavaScript function.
    // The cookie value can be html-encoded (spaces, special characters etc.) and needs to be decoded
    // to use it as the provider group name.
    return encodeURIComponent(decodeURIComponent(cookieValue));
}

export function getLoggedInUserId() {
    return Cookies.get('platform.UserID');
}


export function getPartnerResourcesDownloadUrl() {
    return providerServiceRestEndPoint + "/provider-admin/tax-partner-resources";
}

export const PROVIDER_ADMIN_SETUP_TOOL_WIDGET_NAME = 'CTO-FDS/ProviderSetup@' + VERSION;

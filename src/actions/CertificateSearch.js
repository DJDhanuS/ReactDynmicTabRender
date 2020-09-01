import axios from 'axios';
import { showErrorToast, showSuccessToast } from "./ToastUtils";
import { getBaseUrl, getFinancialToolsBaseUrl, getDashUserGroup } from "../utils/Endpoints";

export function fetchProviderCategories() {
    logInfo({ message: "begin fetch provider categories", action: "fetchProviderCategories" });
    const fetchCategoriesUrl = getBaseUrl() + "/providerCategories" + "?offset=0&count=500";
    return function (dispatch) {
        axios.get(fetchCategoriesUrl).then((response) => {
            dispatch({ type: FETCH_PROVIDER_CATEGORIES_FINISHED, data: response.data.providerCategory });
            logInfo({ message: "fetch provider categories successful", action: "fetchProviderCategories" });
        }).catch((error) => {
            handleError(error, "Error in fetching categories", dispatch);
            logError({ message: "fetch provider failed", action: "fetchProviderCategories", error: error });
        })
    };
}

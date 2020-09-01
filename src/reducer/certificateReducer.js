import {
    DEFAULT_SEARCH,
    DETAIL_SEARCH,
    SET_COMPLEX_SEARCH_KEYS,
    UPDATE_COMPLEX_SEARCH_FILTERS,
    UPDATE_COMPLEX_SEARCH_STRING,
    UPDATE_COMPLEX_SEARCH_LEGACY_FILTERS,
    UPDATE_COMPLEX_SEARCH_QUERY,
    SET_SEARCH_MODE
} from "../utils/ActionTypes";

export default function certificateReducer(state = {}, action) {
    switch (action.type) {
        case DEFAULT_SEARCH:
            const data = action.payload;
          return  state = {...state, data} ;

        case DETAIL_SEARCH:
            const details = action.payload;
            return  state = {...state, details};
        default :
              return state
    }
}



export function certficateComplexSearchReducer(state = {}, action){
    let nextState;
    switch (action.type){
        case SET_COMPLEX_SEARCH_KEYS:
            nextState = {
                ...state,
                keys: action.payload
            };
            return nextState;
        case UPDATE_COMPLEX_SEARCH_FILTERS:
            nextState = {
                ...state,
                filters: action.payload
            };
            return nextState;
        case UPDATE_COMPLEX_SEARCH_STRING:
            nextState = {
                ...state,
                providerSearchString: action.payload.searchString
            }
            return nextState;
        case UPDATE_COMPLEX_SEARCH_LEGACY_FILTERS:
            nextState = {
                ...state,
                legacyFilters : action.payload.legacyFilters
            }
            return nextState;
        case UPDATE_COMPLEX_SEARCH_QUERY:
            nextState = {
                ...state,
                searchQuery : action.payload.query
            }
            return nextState;
        case SET_SEARCH_MODE:
            nextState = {
                ...state,
                searchMode : action.payload.searchMode
            }
            return nextState;
        default:
            return state;
    }
}

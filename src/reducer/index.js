import { combineReducers } from 'redux';
import certificateReducer from './certificateReducer'

export default combineReducers({
    certificate: certificateReducer,
})

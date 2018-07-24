import { combineReducers } from 'redux'
import phones from './phones'
import cities from "./cities";
import tariffs from "./tariffs";

export default combineReducers({
    phones,
    cities,
    tariffs
})

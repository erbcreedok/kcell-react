import { combineReducers } from 'redux'
import phones from './phones'
import cities from "./cities";
import tariffs from "./tariffs";
import mailings from "./mailings";
import contactGroups from "./contactGroups";
import body from "./body";

export default combineReducers({
    body,
    phones,
    cities,
    tariffs,
    mailings,
    contactGroups,
})

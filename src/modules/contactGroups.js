import api from '../api/kcell'
import * as moment from 'moment'

const rootName = 'contactGroups';

export const FETCH = `${rootName}/FETCH`
export const SET_REQUESTING = `${rootName}/REQUEST`

const initialState = {
    list: [
        {
            "id": 1,
            "groupName": "string",
            "phones": [1,2,3,4],
            date: moment('11.06.2018')
        },
        {
            "id": 2,
            "groupName": "Family",
            "phones": [3,4,5,6],
            date: moment('7.05.2018')
        },
        {
            "id": 3,
            "groupName": "SmArt.Point",
            "phones": [8, 9, 10, 13],
            date: moment('12.09.2017')
        }
    ],
    isLoading: false,
    isDirty: false,
    contacts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH:
            return  {
                ...state,
                list: action.payload,
                isDirty: true
            };
        case SET_REQUESTING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state;
    }
}

const setLoading = (status) => dispatch => {
    dispatch({type: SET_REQUESTING, payload: status})
}

export const loadGroups = () => dispatch => {
    dispatch(setLoading(true))

    return api.get('group/list').then( res => {
        const data = res.data.content.groups
        const phones = res.data.content.phonebookContacts
        data.map(item => {
            item.phones = []
            item.phonebookContactIds.forEach(id => {
                item.phones.push(phones.find( phone => phone.id === id))
            })
            return item
        })
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}
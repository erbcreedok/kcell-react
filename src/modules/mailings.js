import api from '../api/kcell'
import * as moment from 'moment'

const rootName = 'mailings';

export const FETCH = `${rootName}/FETCH`
export const SET_REQUESTING = `${rootName}/REQUEST`

const initialState = {
    list: [],
    isLoading: false,
    isDirty: false
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

export const loadMailings = () => dispatch => {
    dispatch(setLoading(true))

    return api.get('sms/bulk-sms/list').then( res => {
        const data = res.data.content.map(item => {
            item.startDate = moment(item.startDate).get()
            item.endDate = moment(item.endDate).get()
            return item
        }).reverse()
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}

export const addMailing = (data) => dispatch => {
    dispatch(setLoading(true))

    return api.post(`sms/bulk-sms/byGroupId/${data.groupId}`, data).then(res => {
        console.log(res)
        dispatch(setLoading(false))
    })
}

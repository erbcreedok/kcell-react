import {getPhones, postPhone} from '../api/kcell/'

const rootName = 'phones';

export const FETCH = `${rootName}/FETCH`
export const SET_REQUESTING = `${rootName}/REQUEST`

const initialState = {
    list: [],
    isLoading: false,
    isDirty: false,
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

export const loadPhones = () => dispatch => {
    dispatch(setLoading(true))

    return getPhones().then( data => {
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}

export const addPhone = (data) => dispatch => {
    dispatch(setLoading(true))
    data.phoneNumber = data.phoneNumber.replace(/[^0-9]/g, '')
    return postPhone(data).then(() => {
        dispatch(setLoading(false))
    })
}

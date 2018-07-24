import api from '../api/kcell'

export const FETCH = 'phones/FETCH'
export const SET_REQUESTING = 'phones/REQUEST'

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

export const loadPhones = () => dispatch => {
    dispatch(setLoading(true))

    return api.post('phonebook/list', {}).then( res => {
        const data = res.data.content
        data.map(item => {
            item.fullName = item.firstName + ' ' + item.middleName + ' ' + item.lastName
            return item
        })
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}

export const addPhone = (data) => dispatch => {
    dispatch(setLoading(true))

    return api.post('phonebook/save-contact', data).then(res => {
        console.log(res)
        dispatch(setLoading(false))
    })
}

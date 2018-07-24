import api from '../api/kcell'

export const FETCH = 'tariffs/FETCH'
export const SET_REQUESTING = 'tariffs/REQUEST'

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
    dispatch({type: SET_REQUESTING , payload: status})
}

export const loadTariffs = () => dispatch => {
    dispatch(setLoading(true))

    return api.get('tariff/list').then( res => {
        const data = res.data.content
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}

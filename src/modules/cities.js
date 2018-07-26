import api from '../api/kcell/index'

const rootName = 'cities';

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
    dispatch({type: SET_REQUESTING , payload: status})
}

export const loadCities = () => dispatch => {
    dispatch(setLoading(true))

    return api.get('city/list').then( res => {
        const data = res.data.content
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}

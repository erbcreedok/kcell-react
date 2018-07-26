import {getMailing, postMailing} from '../api/kcell/index'

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

    return getMailing().then(data => {
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}

export const addMailing = (data) => dispatch => {
    dispatch(setLoading(true))

    data.startDate = data.date[0]
    data.endDate = data.date[1]

    return postMailing(data).then(res => {
        console.log(res)
        dispatch(setLoading(false))
    })
}

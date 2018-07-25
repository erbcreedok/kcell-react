const rootName = 'body';

export const SET_CLASS = `${rootName}/SET_CLASS`
export const SET_STYLE = `${rootName}/SET_STYLE`

const initialState = {
    style: {},
    className: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CLASS:
            return  {
                ...state,
                className: action.payload,
            };
        case SET_STYLE:
            return {
                ...state,
                style: action.payload,
            }
        default:
            return state;
    }
}

export const setBodyClass = (className) => dispatch => {
    dispatch({type: SET_CLASS , payload: className})
}

export const setBodyStyle = (styles) => dispatch => {
    dispatch({type: SET_STYLE , payload: styles})
}
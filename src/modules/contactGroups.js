import api from '../api/kcell'

const rootName = 'contactGroups';

export const FETCH = `${rootName}/FETCH`
export const SET_REQUESTING = `${rootName}/REQUEST`

const initialState = {
    list: [],
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
            return state
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
            item.date = new Date()
            return item
        })
        dispatch({type: FETCH, payload: data})
        dispatch(setLoading(false))
    })
}
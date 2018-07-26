import axios from 'axios';
import * as moment from "moment";

const api = axios.create({
    baseURL: `http://kcellapi.elefanto.kz/api/`,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getPhones = (filter = {}) => {
    return api.post('phonebook/list', filter).then( res => {
        const data = res.data.content
        data.map(item => {
            item.fullName = item.firstName + ' ' + item.middleName + ' ' + item.lastName
            return item
        })
        return data
    })
}
export const postPhone = (data) => {
    data.phoneNumber = data.phoneNumber.replace(/[^0-9]/g, '')
    return api.post('phonebook/save-contact', data)
}

export const getMailing = () => {
    return api.get('sms/bulk-sms/list').then( res => {
        const data = res.data.content.map(item => {
            item.startDate = moment(item.startDate).get()
            item.endDate = moment(item.endDate).get()
            return item
        }).reverse()
        return data
    })
}
export const postMailing = (data) => {
    console.log(data);
    return api.post('sms/custom-bulk-sms', data).then(res => {
        console.log(res)
        return res
    })
}

export default api

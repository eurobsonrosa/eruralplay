import Vue from 'vue'

export const userKey = process.env.VUE_APP_USER_KEY
export const baseApiUrl = process.env.VUE_APP_BASE_API_URL

export function showError(e){
    if(e && e.response && e.response.data){
        Vue.toasted.global.defaultError({ msg: e.response.data.msg })
    } else if(typeof e === 'string'){
        Vue.toasted.global.defaultError({ msg: e })
    }
    else {
        Vue.toasted.global.defaultError()
    }    
}

export default { baseApiUrl, showError, userKey }
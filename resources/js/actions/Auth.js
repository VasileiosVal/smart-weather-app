import {setLang} from "./Lang";
import {logout} from "../general_functions/generalFunctions";

let saveUser = ({auth=false, role='user'} = {}) => {
    return {
        type: 'CHECK_AUTH',
        data: {
            auth,
            role
        }
    }
}

let logoutUser = () => {
    return {
        type: 'LOGOUT'
    }
}

export let startLogoutUser = () => {
    return (dispatch) => {
        return new Promise((resolve)=>{
            dispatch(logoutUser())
            resolve()
        })
    }
}


export let startCheckAuth = () => {
    return (dispatch) => {
       return axios.get('api/auth/check/')
             .then((response)=>{
                 dispatch(saveUser(response.data))
                 dispatch(setLang(response.data.lang))
             })
            .catch((e)=>{
                logout()
            });
    }
};
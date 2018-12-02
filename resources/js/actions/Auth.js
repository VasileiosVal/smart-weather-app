import {setLang} from "./Lang";
import {logout} from "../general_functions/generalFunctions";
import {saveUser} from "./User";



export let startLogoutUser = () => {
    logout()
};


export let startCheckAuthAndSaveUser = () => {
    return (dispatch) => {
        return axios('/api/auth/user')
            .then((response)=>{
                dispatch(saveUser(response.data.user));
                dispatch(setLang(response.data.lang));
            })
            .catch(()=>{
                logout();
            });
    }
};



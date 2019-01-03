import {setLang} from "./Lang";
import {saveUser} from "./User";


export let startCheckAuthAndSaveUser = () => dispatch => {
        return axios('/api/auth/user')
            .then(response => {
                dispatch(saveUser(response.data.user));
                dispatch(setLang(response.data.lang));
            })
            .catch(()=>{
                return 'error';
            });
};



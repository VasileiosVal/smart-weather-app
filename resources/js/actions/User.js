import {startLogoutUser} from "./Auth";
import {
    notifyUnauthorizedAction
} from "../general_functions/notifiers";

export let saveUser = ({name='', surname='', email='', role_id=null, is_active=0, stations=[], confirmed=null, created_at=null, updated_at=null} = {}) => {
    return {
        type: 'SAVE_USER',
        user: {
            name,
            surname,
            email,
            role_id,
            is_active,
            stations,
            confirmed,
            created_at: created_at.date,
            updated_at: updated_at.date
        }
    }
};

let saveUsers = (users=[]) => {
    return {
        type: 'SAVE_USERS',
        users
    }
};

export let startSaveUsers = () => {
    return (dispatch) => {
        return axios('/api/auth/users').then((response)=>{
            let arr = [];
            response.data.forEach((user)=>{
                arr.push(user)
            });
            dispatch(saveUsers(arr))
        }).catch(()=>{
            startLogoutUser();
        });
    }
};

export let createUser = (user) => {
    return {
        type: 'CREATE_USER',
        user: {...user, stations: [], confirmed: user.confirmed ? user.created_at : null}
    }
};

export let startCreateUser = (email='', password='', password_confirmation='', name='', surname='', role_id=null) => {
    return (dispatch) => {
        return axios.post('/api/auth/users', {
            email,
            password,
            password_confirmation,
            name,
            surname,
            role_id
        })
            .then((response)=>{
                dispatch(createUser(response.data));
            })
            .catch((e)=>{
                if(e.response.status === 422){
                    notifyUnauthorizedAction();
                } else {
                    notifyUnauthorizedAction();
                    setTimeout(()=>{startLogoutUser()}, 1500);
                }
            })
    }
};

export let editUser = (user) => {
  return {
      type: 'EDIT_USER',
      user
  }
};

export let startEditUser = (email='', role_id=null, is_active=0) => {
    return (dispatch) => {
        return axios.patch(`/api/auth/users/${email}`, {
            role_id,
            is_active
        })
            .then((response)=>{
                dispatch(editUser(response.data))
            })
            .catch((e)=>{
                if(e.response.status === 422 || e.response.status === 404){
                    notifyUnauthorizedAction();
                } else {
                    notifyUnauthorizedAction();
                    setTimeout(()=>{startLogoutUser()}, 1500);
                }
            })
    }
};

export let deleteUser = (user) => {
    return {
        type: 'DELETE_USER',
        user
    }
};

export let startDeleteUser = (email='') => {
    return (dispatch) => {
        return axios.delete(`/api/auth/users/${email}`)
            .then((response)=>{
                dispatch(deleteUser(response.data))
            })
            .catch((e)=>{
                if(e.response.status === 404){
                    notifyUnauthorizedAction();
                } else {
                    notifyUnauthorizedAction();
                    setTimeout(()=>{startLogoutUser()}, 1500);
                }
            })
    }
};

export let editProfile = (user) => {
    return {
        type: 'EDIT_PROFILE',
        user: {
            email: user.email,
            name: user.name,
            surname: user.surname,
            updated_at: user.updated_at
        }
    }
};

export let startEditProfile = (lastEmail='', email='', name='', surname='') => {
    return (dispatch) => {
        return axios.patch(`/api/auth/profile/${lastEmail}/edit/details`, {
            email,
            name,
            surname
        })
            .then((response)=>{
                dispatch(editProfile(response.data))
                if(response.data.role_id === 1){
                    dispatch(editUser(response.data))
                }
            })
            .catch((e)=>{
                if(e.response.status === 422 || e.response.status === 404){
                    notifyUnauthorizedAction();
                } else {
                    notifyUnauthorizedAction();
                    setTimeout(()=>{startLogoutUser()}, 1500);
                }
            })
    }
}

export let startDeleteProfile = (email='') => {
    return () => {
        return axios.delete(`/api/auth/profile/${email}`)
            .then((response)=>{})
            .catch((e)=>{
                if(e.response.status === 404){
                    notifyUnauthorizedAction();
                } else {
                    notifyUnauthorizedAction();
                    setTimeout(()=>{startLogoutUser()}, 1500);
                }
            })
    }
};

export let deleteUsers = () => {
    return {
        type: 'DELETE_USERS'
    }
};

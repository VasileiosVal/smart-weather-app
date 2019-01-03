import {
    notifyEditedUserCurrentPasswordDontMatch, notifyUserEmailExists
} from "../general_functions/notifiers";
import {notifyUnauthorizedActionAndLogout} from "../general_functions/generalFunctions";

export let saveUser = (user = {}) => ({
        type: 'SAVE_USER',
        user
    });

let saveUsers = (users=[]) => ({
        type: 'SAVE_USERS',
        users
    });

export let startSaveUsers = () => dispatch => {
        return axios('/api/auth/users')
            .then(response => {
            let arr = [];
            response.data.forEach(user => arr.push(user));
            dispatch(saveUsers(arr))
        }).catch(e => {
            return 'error';
        });
};

export let createUser = (user) => ({
        type: 'CREATE_USER',
        user: {...user, confirmed: user.confirmed ? user.created_at : null}
    });

export let startCreateUser = (email='', password='', password_confirmation='', name='', surname='', role_id=null) => dispatch => {
        return axios.post('/api/auth/users', {
            email,
            password,
            password_confirmation,
            name,
            surname,
            role_id
        })
            .then(response => dispatch(createUser(response.data)))
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let editUser = user => ({
      type: 'EDIT_USER',
      user
  });

export let startEditUser = (email='', role_id=null, is_active=0) => dispatch => {
        return axios.patch(`/api/auth/users/${email}`, {
            role_id,
            is_active
        })
            .then(response => {
                if(response.status === 202){
                    return 'same';
                } else {
                    dispatch(editUser(response.data))
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let deleteUser = user => ({
        type: 'DELETE_USER',
        user
    });

export let deleteUserStations = stations => ({
        type: 'DELETE_USER_STATIONS',
        stations
    });

export let deleteUserStationsCollections = collections => ({
        type: 'DELETE_USER_STATIONS_COLLECTIONS',
        collections
    });

export let startDeleteUser = (email='') => (dispatch, getState) => {
        return axios.delete(`/api/auth/users/${email}`)
            .then(response => {

                //find possible stations that belong to deleted user
                let deletedUserStations = [];
                getState().stations.forEach(station => {
                    if(station.user_id === response.data.id){
                        deletedUserStations.push(station.id)
                    }
                });
                //find possible collections that belong to deleted stations
                let deletedUserStationsCollections = [];
                getState().collections.forEach(collection => {
                   if(deletedUserStations.includes(collection.station_id)){
                       deletedUserStationsCollections.push(collection.id)
                   }
                });
                let completedJobs = 1;

                //if found collections, delete them
                if(deletedUserStationsCollections.length){
                    dispatch(deleteUserStationsCollections(deletedUserStationsCollections));
                    completedJobs = 3;
                }
                //if found stations, delete them
                if(deletedUserStations.length){
                    dispatch(deleteUserStations(deletedUserStations));
                    if(completedJobs !== 3){
                        completedJobs = 2;
                    }
                }
                //delete user
                dispatch(deleteUser(response.data));

                return completedJobs;
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let editProfileDetails = user => ({
        type: 'EDIT_PROFILE',
        user
    });

export let startEditProfileDetails = (lastEmail='', email='', name='', surname='') => dispatch => {
        return axios.patch(`/api/auth/profile/${lastEmail}/edit/details`, {
            email,
            name,
            surname
        })
            .then(response => {
                if(response.status === 202){
                    return 'same';
                } else {
                    dispatch(editProfileDetails(response.data));
                    if(response.data.role_id === 1){
                        dispatch(editUser(response.data))
                    }
                }
            })
            .catch(e => {
                if(e.response.status === 422){
                    if(e.response.data.errors.email){
                        notifyUserEmailExists();
                        return 1;
                    }
                }
                notifyUnauthorizedActionAndLogout()
            })
};

export let startEditProfilePassword = (email='', password='', newPassword='', newPassword_confirmation='') => () => {
        return axios.patch(`/api/auth/profile/${email}/edit/password`, {
            password,
            newPassword,
            newPassword_confirmation
        })
            .then(response=>{})
            .catch(e=>{
                if(e.response.status === 422){
                    if(e.response.data.accept === 1){
                        notifyEditedUserCurrentPasswordDontMatch();
                        return 1;
                    }
                }
                notifyUnauthorizedActionAndLogout()
            })
};

export let startDeleteProfile = (email='') => () => {
    return axios.delete(`/api/auth/profile/${email}`)
        .then(response=>{})
        .catch(e => notifyUnauthorizedActionAndLogout())
};

// export let deleteUsers = () => {
//     return {
//         type: 'DELETE_USERS'
//     }
// };

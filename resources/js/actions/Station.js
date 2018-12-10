import {startLogoutUser} from "./Auth";
import {
    notifyStationNameExists, notifyStationUniqueExists,
    notifyUnauthorizedAction
} from "../general_functions/notifiers";

let saveStations = (stations=[]) => {
    return {
        type: 'SAVE_STATIONS',
        stations
    }
};

export let startSaveStations = () => {
    return (dispatch) => {
        return axios('/api/auth/stations').then((response)=>{
            let arr = [];
            response.data.forEach((station)=>{
                arr.push(station)
            });
            dispatch(saveStations(arr))
        }).catch(()=>{
            startLogoutUser();
        });
    }
};

export let createStation = (station) => {
    return {
        type: 'CREATE_STATION',
        station
    }
};

export let startCreateStation = (name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories='') => {
    return (dispatch) => {
        return axios.post('/api/auth/stations/admin', {
            name,
            unique,
            user_id,
            location,
            is_active,
            privacy,
            description,
            categories
        })
            .then((response)=>{
                dispatch(createStation(response.data))
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
};

export let startCreateStationForUser = (name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories='') => {
    return (dispatch) => {
        return axios.post('/api/auth/stations/user', {
            name,
            unique,
            user_id,
            location,
            is_active,
            privacy,
            description,
            categories
        })
            .then((response)=>{
                dispatch(createStation(response.data))
            })
            .catch((e)=>{
                if(e.response.status === 422){
                    if(e.response.data.errors.name){
                        notifyStationNameExists();
                        return 1;
                    }else if(e.response.data.errors.unique){
                        notifyStationUniqueExists();
                        return 1;
                    }
                }
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
};

export let editStation = (station) => {
    return {
        type: 'EDIT_STATION',
        station
    }
};

export let startEditStation = (lastName='', name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories='') => {
    return (dispatch) => {
        return axios.patch(`/api/auth/stations/${lastName}/edit/admin`, {
            name,
            unique,
            user_id,
            location,
            is_active,
            privacy,
            description,
            categories
        })
            .then((response)=>{
                dispatch(editStation(response.data));
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
};

export let startEditStationForUser = (lastName='', name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories='') => {
    return (dispatch) => {
        return axios.patch(`/api/auth/stations/${lastName}/edit/user`, {
            name,
            unique,
            user_id,
            location,
            is_active,
            privacy,
            description,
            categories
        })
            .then((response)=>{
                dispatch(editStation(response.data))
            })
            .catch((e)=>{
                if(e.response.status === 422){
                    if(e.response.data.errors.name){
                        notifyStationNameExists();
                        return 1;
                    }else if(e.response.data.errors.unique){
                        notifyStationUniqueExists();
                        return 1;
                    }
                }
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
};

export let startEditStationFromAll = (name='', user_id=0, is_active=0, privacy='') => {
    return (dispatch) => {
        return axios.patch(`/api/auth/stations/${name}/all/edit`, {
            user_id,
            is_active,
            privacy
        })
            .then((response)=>{
                dispatch(editStation(response.data))
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
}

export let deleteStation = (station) => {
    return {
        type: 'DELETE_STATION',
        station
    }
};

export let startDeleteStation = (name='') => {
    return (dispatch) => {
        return axios.delete(`/api/auth/stations/${name}`)
            .then((response)=>{
                dispatch(deleteStation(response.data))
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
};

export let startDeleteStationFromAdmin = (name='') => {
    return (dispatch) => {
        return axios.delete(`/api/auth/stations/${name}/admin`)
            .then((response)=>{
                dispatch(deleteStation(response.data))
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
};


export let deleteStations = () => {
    return {
        type: 'DELETE_STATIONS'
    }
};
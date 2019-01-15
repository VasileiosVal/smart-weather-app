import {
    notifyStationNameExists, notifyStationUniqueExists
} from "../general_functions/notifiers";
import {deleteUserStationsCollections} from "./User";
import {notifyUnauthorizedActionAndLogout} from "../general_functions/generalFunctions";

let saveStations = (stations=[]) => ({
        type: 'SAVE_STATIONS',
        stations
    });

export let startSaveStations = () => dispatch => {
        return axios('/api/auth/stations')
            .then(response => {
            let arr = [];
            response.data.forEach(station => arr.push(station));
            dispatch(saveStations(arr))
        }).catch(()=>{
            return 'error';
        });
};

export let createStation = station => ({
        type: 'CREATE_STATION',
        station
    });

export let startCreateStation = (name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories=[]) => dispatch => {
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
            .then(response => dispatch(createStation(response.data)))
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let startCreateStationForUser = (name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories=[]) => dispatch => {
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
            .then(response=>dispatch(createStation(response.data)))
            .catch(e => {
                if(e.response.status === 422){
                    if(e.response.data.errors.name){
                        notifyStationNameExists();
                        return 1;
                    }else if(e.response.data.errors.unique){
                        notifyStationUniqueExists();
                        return 1;
                    }
                }
                notifyUnauthorizedActionAndLogout()
            })
};

export let editStation = station => ({
        type: 'EDIT_STATION',
        station
    });

export let startEditStation = (lastName='', name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories=[]) => dispatch => {
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
            .then(response => {
                if(response.status === 202){
                    return 'same';
                } else {
                    dispatch(editStation(response.data));
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let startEditStationForUser = (lastName='', name='', unique='', user_id='', location='', is_active='', privacy='', description='', categories=[]) => dispatch => {
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
            .then(response => {
                if(response.status === 202){
                    return 'same';
                }else{
                    dispatch(editStation(response.data))
                }
            })
            .catch(e => {
                if(e.response.status === 422){
                    if(e.response.data.errors.name){
                        notifyStationNameExists();
                        return 1;
                    }else if(e.response.data.errors.unique){
                        notifyStationUniqueExists();
                        return 1;
                    }
                }
                notifyUnauthorizedActionAndLogout();
            })
};

export let startEditStationFromAll = (name='', user_id=0, is_active=0, privacy='') => dispatch => {
        return axios.patch(`/api/auth/stations/${name}/all/edit`, {
            user_id,
            is_active,
            privacy
        })
            .then(response => {
                if(response.status === 202){
                    return 'same';
                } else {
                    dispatch(editStation(response.data))
                    //mporeis na kaneis kai edw return timh px: return 'ok'
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let deleteStation = station => ({
        type: 'DELETE_STATION',
        station
});

export let startDeleteStation = (name='') => (dispatch, getState) => {
        return axios.delete(`/api/auth/stations/${name}`)
            .then(response => {

                //find possible collections that belong to deleted station
                let deletedStationCollections = [];
                getState().collections.forEach(collection=>{
                    if(collection.station_id === response.data.id){
                      deletedStationCollections.push(collection.id)
                    }
                });

                let completedJobs = 1;

                if(deletedStationCollections.length){
                    dispatch(deleteUserStationsCollections(deletedStationCollections));
                    completedJobs = 2;
                }
                dispatch(deleteStation(response.data));
                return completedJobs;
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let startDeleteStationFromAdmin = (name='') => (dispatch, getState) => {
        return axios.delete(`/api/auth/stations/${name}/admin`)
            .then(response => {

                //find possible collections that belong to deleted station
                let deletedStationCollections = [];
                getState().collections.forEach(collection => {
                    if(collection.station_id === response.data.id){
                        deletedStationCollections.push(collection.id)
                    }
                });

                let completedJobs = 1;

                if(deletedStationCollections.length){
                    dispatch(deleteUserStationsCollections(deletedStationCollections));
                    completedJobs = 2;
                }
                dispatch(deleteStation(response.data));
                return completedJobs;
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
};


// export let deleteStations = () => {
//     return {
//         type: 'DELETE_STATIONS'
//     }
// };
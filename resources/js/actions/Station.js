import {startLogoutUser} from "./Auth";

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
}


export let deleteStations = () => {
    return {
        type: 'DELETE_STATIONS'
    }
};
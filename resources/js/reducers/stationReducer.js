export let stationReducer = (state=[], action) => {
    switch (action.type){
        case 'SAVE_STATIONS':
            return action.stations;
        case 'CREATE_STATION':
            return [...state, action.station];
        case 'EDIT_STATION':
            return state.map((station)=>{
                if(station.id === action.station.id){
                    return {...station, ...action.station};
                }else{
                    return station;
                }
            });
        case 'DELETE_STATION':
            return state.filter((station)=>station.id !== action.station.id);
        case 'DELETE_STATIONS':
            return [];
        default :
            return state;
    }
};
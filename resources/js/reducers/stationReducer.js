export let stationReducer = (state=[], action) => {
    switch (action.type){
        case 'SAVE_STATIONS':
            return action.stations;
        case 'DELETE_STATIONS':
            return [];
        default :
            return state;
    }
};
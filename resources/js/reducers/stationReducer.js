export let stationReducer = (state=[], action) => {
    switch (action.type){
        case 'SAVE_STATIONS':
            return action.stations;
        case 'CREATE_STATION':
            return [...state, action.station];
        case 'EDIT_STATION':
            return state.map(station => {
                if(station.id === action.station.id){
                    return {...station, ...action.station};
                }else{
                    return station;
                }
            });
        case 'EDIT_CATEGORY_ON_STATIONS':
            if(state.length){
                let arr = [];
               state.forEach(station => {
                   if(station.categories.length){
                       let newCategoriesArray = station.categories.map(category => {
                           if (category.id === action.category.id) {
                               return {...category, ...action.category}
                           } else {
                               return category;
                           }
                       });
                       let stationWithUpdatedCategories = {...station, categories: newCategoriesArray};
                       arr.push(stationWithUpdatedCategories)
                   } else {
                       arr.push(station)
                   }
               });
                return arr;
            } else {
                return state;
            }
        case 'DELETE_STATION':
            return state.filter(station => station.id !== action.station.id);
        case 'DELETE_USER_STATIONS':
            return state.filter(station => !action.stations.includes(station.id));
        case 'DELETE_STATIONS':
            return [];
        default :
            return state;
    }
};

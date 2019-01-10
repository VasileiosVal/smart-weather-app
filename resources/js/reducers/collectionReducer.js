export let collectionReducer = (state=[], action) => {
    switch(action.type){
        case 'SAVE_COLLECTIONS':
            return action.collections;
        case 'CREATE_COLLECTIONS':
            return [...state, ...action.collections];
        case 'CREATE_COLLECTION':
            return [...state, action.collection];
        case 'DELETE_USER_STATIONS_COLLECTIONS':
            return state.filter(collection => !action.collections.includes(collection.id));
        case 'DELETE_COLLECTION':
            return state.filter(collection => collection.id !== action.collection.id);
        default:
            return state;
    }
};
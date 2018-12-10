export let collectionReducer = (state=[], action) => {
    switch(action.type){
        case 'SAVE_COLLECTIONS':
            return action.collections;
        default:
            return state;
    }
};
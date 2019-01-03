export let langReducer = (state='', action) => {
    switch(action.type){
        case 'CHANGE_LANG':
            return action.lang;
        default:
            return state;
    }
};
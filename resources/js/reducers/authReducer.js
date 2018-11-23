export let authReducer = (state={}, action) => {
    switch(action.type){
        case 'CHECK_AUTH':
            return action.data;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};
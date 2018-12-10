export let userReducer = (state={}, action) => {
    switch (action.type){
        case 'SAVE_USER':
            return action.user;
        case 'EDIT_PROFILE':
            return {...state, ...action.user};
        default :
            return state;
    }
};
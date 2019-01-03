export let usersReducer = (state=[], action) => {
    switch (action.type){
        case 'SAVE_USERS':
            return action.users;
        case 'CREATE_USER':
            return [...state, action.user];
        case 'EDIT_USER':
            return state.map(user=>{
                if(user.id === action.user.id){
                    return {...user, ...action.user}
                }else{
                    return user;
                }
            });
        case 'DELETE_USER':
            return state.filter(user=>user.id !== action.user.id);
        case 'DELETE_USERS':
            return [];
        default :
            return state;
    }
}
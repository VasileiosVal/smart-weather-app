export let LangReducer = (state='', action) => {
    switch(action.type){
        case 'CHANGE_LANG':
            return action.lang
        default:
            return state
    }
}
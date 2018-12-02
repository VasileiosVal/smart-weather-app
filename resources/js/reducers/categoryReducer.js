export let categoryReducer = (state=[], action) => {
    switch (action.type){
        case 'SAVE_CATEGORIES':
            return action.categories;
        case 'DELETE_CATEGORIES':
            return [];
        case 'CREATE_CATEGORY':
            return [...state, action.category];
        case 'EDIT_CATEGORY':
            return state.map((category)=>{
                if(category.id === action.category.id){
                    return {...category, ...action.category}
                }else{
                    return category;
                }
            });
        case 'DELETE_CATEGORY':
            return state.filter((category)=>{
                return category.id !== action.category.id;
            });
        default :
            return state;
    }
};
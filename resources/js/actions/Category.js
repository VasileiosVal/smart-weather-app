import {notifyUnauthorizedActionAndLogout} from "../general_functions/generalFunctions";

let saveCategories = (categories=[]) => ({
        type: 'SAVE_CATEGORIES',
        categories
    });

export let startSaveCategories = () => dispatch => {
       return axios('/api/auth/categories')
           .then(response => {
            let arr = [];
            response.data.forEach(category => arr.push(category));
           dispatch(saveCategories(arr));
        }).catch(e => {
           return 'error';
       });
};

export let createCategory = category => ({
        type: 'CREATE_CATEGORY',
        category
    });

export let startCreateCategory = (name='', symbol='') => dispatch => {
        return axios.post('/api/auth/categories', {
            name,
            symbol
        }).then(response => dispatch(createCategory(response.data)))
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let editCategory = category => ({
        type: 'EDIT_CATEGORY',
        category
    });

export let editCategoryOnStations = category => ({
        type: 'EDIT_CATEGORY_ON_STATIONS',
        category
    });

export let startEditCategory = (lastName='', name='', symbol='') => dispatch => {
        return axios.patch(`/api/auth/categories/${lastName}`, {
            name,
            symbol
        }).then((response)=>{
            if(response.status === 202){
                return 'same';
            } else {
                dispatch(editCategory(response.data));
                dispatch(editCategoryOnStations(response.data));
            }
        }).catch(e => notifyUnauthorizedActionAndLogout())
};

// export let deleteCategory = (category) => {
//     return {
//         type: 'DELETE_CATEGORY',
//         category
//     }
// };

export let startDeleteCategory = (name='') => () => {
        return axios.delete(`/api/auth/categories/${name}`)
            .then(()=>{
                return 'deleted';
        }).catch(e => notifyUnauthorizedActionAndLogout())
};


// export let deleteCategories = () => {
//     return {
//         type: 'DELETE_CATEGORIES'
//     }
// };


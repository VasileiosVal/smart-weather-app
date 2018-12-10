import {startLogoutUser} from "./Auth";
import {
    notifyUnauthorizedAction
} from "../general_functions/notifiers";

let SaveCategories = (categories=[]) => {
    return {
        type: 'SAVE_CATEGORIES',
        categories
    }
};

export let startSaveCategories = () => {
    return (dispatch) => {
       return axios('/api/auth/categories').then((response)=>{
            let arr = [];
            response.data.forEach((category)=>{
                arr.push(category)
            });
           dispatch(SaveCategories(arr));
        }).catch((e)=>{
           startLogoutUser();
       });
    }
};

export let createCategory = (category) => {
    return {
        type: 'CREATE_CATEGORY',
        category
    }
};

export let startCreateCategory = (name='', symbol='') => {
    return (dispatch) => {
        return axios.post('/api/auth/categories', {
            name,
            symbol
        }).then((response)=>{
            dispatch(createCategory(response.data))
        }).catch((e)=>{
            notifyUnauthorizedAction();
            setTimeout(()=>{startLogoutUser()}, 1500);
        })
    }
};

export let editCategory = (category) => {
    return {
        type: 'EDIT_CATEGORY',
        category
    }
}

export let startEditCategory = (lastName='', name='', symbol='') => {
    return (dispatch) => {
        return axios.patch(`/api/auth/categories/${lastName}`, {
            name,
            symbol
        }).then((response)=>{
            dispatch(editCategory(response.data))
        }).catch((e)=>{
            notifyUnauthorizedAction();
            setTimeout(()=>{startLogoutUser()}, 1500)
        })
    }
};

export let deleteCategory = (category) => {
    return {
        type: 'DELETE_CATEGORY',
        category
    }
};

export let startDeleteCategory = (name='') => {
    return (dispatch) => {
        return axios.delete(`/api/auth/categories/${name}`)
            .then((response)=>{
           dispatch(deleteCategory(response.data));
        }).catch((e)=>{
            notifyUnauthorizedAction();
            setTimeout(()=>{startLogoutUser()}, 1500)
        })
    }
};


export let deleteCategories = () => {
    return {
        type: 'DELETE_CATEGORIES'
    }
};


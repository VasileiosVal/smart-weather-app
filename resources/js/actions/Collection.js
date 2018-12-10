import {startLogoutUser} from "./Auth";

let saveCollections = (collections) => {
    return {
        type: 'SAVE_COLLECTIONS',
        collections
    }
};

export let startSaveCollections = () => {
    return (dispatch) => {
        return axios('/api/auth/collections')
            .then((response)=>{
                let arr=[];
                response.data.forEach((collection)=>{
                    arr.push(collection)
                });
                dispatch(saveCollections(arr))
            })
            .catch((e)=>{
                startLogoutUser();
            })
    }
};
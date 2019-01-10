import {notifyUnauthorizedActionAndLogout} from "../general_functions/generalFunctions";

let saveCollections = (collections=[]) => ({
        type: 'SAVE_COLLECTIONS',
        collections
});

export let startSaveCollections = () => dispatch => {
        return axios('/api/auth/collections')
            .then(response => {
                let arr=[];
                response.data.forEach(collection => arr.push(collection));
                dispatch(saveCollections(arr))
            })
            .catch((e)=>{
                return 'error';
            })
};

export let createStationCollections = collections => ({
        type: 'CREATE_COLLECTIONS',
        collections
});

export let createCollection = collection => ({
        type: 'CREATE_COLLECTION',
        collection
});

export let deleteCollection = collection => ({
        type: 'DELETE_COLLECTION',
        collection
});

export let startDeleteCollection = (hash='') => dispatch => {
      return axios.delete(`/api/auth/collections/${hash}`)
          .then(response => dispatch(deleteCollection(response.data)))
          .catch(e => notifyUnauthorizedActionAndLogout())
};

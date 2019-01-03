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

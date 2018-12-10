import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {LangReducer} from "../reducers/LangReducer";
import {userReducer} from "../reducers/userReducer";
import {categoryReducer} from "../reducers/categoryReducer";
import {stationReducer} from "../reducers/stationReducer";
import {usersReducer} from "../reducers/usersReducer";
import {collectionReducer} from "../reducers/collectionReducer";
import {filterReducer} from "../reducers/filterReducer";

export let configureStore = () => {
    let store = createStore(combineReducers({
        language: LangReducer,
        user: userReducer,
        categories: categoryReducer,
        stations: stationReducer,
        users: usersReducer,
        collections: collectionReducer,
        filters: filterReducer
    }),
    applyMiddleware(thunk));

    return store;
};
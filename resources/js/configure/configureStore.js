import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {langReducer} from "../reducers/langReducer";
import {userReducer} from "../reducers/userReducer";
import {categoryReducer} from "../reducers/categoryReducer";
import {stationReducer} from "../reducers/stationReducer";
import {usersReducer} from "../reducers/usersReducer";
import {collectionReducer} from "../reducers/collectionReducer";

export let configureStore = () => {

    let store = createStore(combineReducers({
        language: langReducer,
        user: userReducer,
        categories: categoryReducer,
        stations: stationReducer,
        users: usersReducer,
        collections: collectionReducer
    }), composeWithDevTools(applyMiddleware(thunk)));

    return store;
};
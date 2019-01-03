import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {langReducer} from "../reducers/langReducer";
import {userReducer} from "../reducers/userReducer";
import {categoryReducer} from "../reducers/categoryReducer";
import {stationReducer} from "../reducers/stationReducer";
import {usersReducer} from "../reducers/usersReducer";
import {collectionReducer} from "../reducers/collectionReducer";

export let configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    let store = createStore(combineReducers({
        language: langReducer,
        user: userReducer,
        categories: categoryReducer,
        stations: stationReducer,
        users: usersReducer,
        collections: collectionReducer
    }), composeEnhancers(applyMiddleware(thunk)));

    return store;
};
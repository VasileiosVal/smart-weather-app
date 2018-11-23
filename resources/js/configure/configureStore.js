import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from "../reducers/authReducer";
import {LangReducer} from "../reducers/LangReducer";

export let configureStore = () => {
    let store = createStore(combineReducers({
       checkAuth: authReducer,
        language: LangReducer
    }),
    applyMiddleware(thunk));

    return store;
};
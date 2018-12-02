//*******react configuration*******
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from "./routes/AppRouter";
import {configureStore} from "./configure/configureStore";
import {startCheckAuthAndSaveUser, startLogoutUser} from "./actions/Auth";
import {Loader} from "./components/Loader";
import {createCategory, deleteCategory, editCategory, startSaveCategories} from "./actions/Category";
import {startSaveStations} from "./actions/Station";
import {createUser, deleteUser, editUser, startSaveUsers} from "./actions/User";
import {
    notifyGeneralCreatedEl, notifyGeneralCreatedUser, notifyGeneralDeletedEl, notifyGeneralDeletedUser,
    notifyGeneralEditedEl, notifyGeneralEditedUser, notifyTheDeletedUser, notifyTheDowngradedUser,
    notifyTheInactiveUser, notifyTheUpgradedUser
} from "./general_functions/notifiers";
import {refreshToDashboard} from "./general_functions/generalFunctions";


if (document.getElementById('app_component')) {

    ReactDOM.render(<Loader/>, document.getElementById('app_component'));

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + Laravel.apiToken;
    axios.defaults.headers.common['Accept'] = 'application/json';

    let store = configureStore();

    let jsx = (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );

    let renderApp = () => {
        ReactDOM.render(jsx, document.getElementById('app_component'));
    };


    store.dispatch(startCheckAuthAndSaveUser()).then(() => {
        store.dispatch(startSaveCategories()).then(() => {
            store.dispatch(startSaveStations()).then(() => {

                if(store.getState().user.role_id === 1){
                    store.dispatch(startSaveUsers()).then(()=>{
                        renderApp();
                    })
                } else {
                    renderApp();
                }

                //category created
                window.Echo.channel('category').listen('categoryCreated', e => {
                    store.dispatch(createCategory(e.category));
                    notifyGeneralCreatedEl();
                });
                //category edited
                window.Echo.channel('category').listen('categoryEdited', e => {
                    store.dispatch(editCategory(e.category));
                    notifyGeneralEditedEl();
                });
                // category deleted
                window.Echo.channel('category').listen('categoryDeleted', e => {
                    store.dispatch(deleteCategory(e.category));
                    notifyGeneralDeletedEl();
                });
                //user created (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('userCreated', e => {
                        store.dispatch(createUser(e.user));
                        notifyGeneralCreatedUser();
                    });
                }
                //user edited (private)
                if(store.getState().user.role_id === 1){
                    window.Echo.private('private_user').listen('userEdited', e => {
                        if(e.user.email !== store.getState().user.email){
                            store.dispatch(editUser(e.user));
                            notifyGeneralEditedUser();
                        }
                    })
                }
                //user edited
                window.Echo.channel('user').listen('userGeneralEdited', e => {
                    if(e.user.email === store.getState().user.email){
                        if(!e.user.is_active){
                            notifyTheInactiveUser();
                            setTimeout(()=>{startLogoutUser()},2000);
                        }else if(e.user.role_id !== store.getState().user.role_id && e.user.role_id === 1){
                            notifyTheUpgradedUser();
                            setTimeout(()=>{refreshToDashboard()}, 2000)
                        } else if(e.user.role_id !== store.getState().user.role_id && e.user.role_id === 2){
                            notifyTheDowngradedUser();
                            setTimeout(()=>{refreshToDashboard()}, 2000)
                        }
                    }
                });
                //user deleted (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('userDeleted', e => {
                        if(e.user.email !== store.getState().user.email){
                            store.dispatch(deleteUser(e.user));
                            notifyGeneralDeletedUser();
                        }
                    });
                }
                //user deleted
                window.Echo.channel('user').listen('userGeneralDeleted', e => {
                    if(e.user.email === store.getState().user.email){
                        notifyTheDeletedUser();
                        //email?
                        setTimeout(()=>{startLogoutUser()},2000);
                    }
                });
            });
        });
    });
}

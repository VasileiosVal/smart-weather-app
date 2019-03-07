//*******react configuration*******
import React from 'react';
import Echo from 'laravel-echo';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from "./routes/AppRouter";
import moment from 'moment';
// moment.locale('el');
import {configureStore} from "./configure/configureStore";
import {startCheckAuthAndSaveUser} from "./actions/User";
import {Loader} from "./components/General/Loader";
import {
    createCategory, editCategory, editCategoryOnStations,
    startSaveCategories
} from "./actions/Category";
import {createStation, deleteStation, editStation, startSaveStations} from "./actions/Station";
import {
    createUser, deleteUser, deleteUserStations, deleteUserStationsCollections, editUser,
    startSaveUsers
} from "./actions/User";
import {
    notifyAdminsDeletedUserEmailNotSent, notifyAdminsSuspendedUserEmailNotSent,
    notifyGeneralCreatedCollection,
    notifyGeneralCreatedEl, notifyGeneralCreatedStation, notifyGeneralCreatedStationWithOwnership,
    notifyGeneralCreatedUser, notifyGeneralDeletedCollection, notifyGeneralDeletedEl,
    notifyGeneralDeletedStation, notifyGeneralDeletedStationCollections,
    notifyGeneralDeletedUser, notifyGeneralDeletedUserCollections, notifyGeneralDeletedUserStations,
    notifyGeneralEditedEl, notifyGeneralEditedStation, notifyGeneralEditedStationWithOwnership, notifyGeneralEditedUser,
    notifyTheDeletedUser, notifyTheDowngradedUser,
    notifyTheInactiveUser, notifyTheUpgradedUser
} from "./general_functions/notifiers";
import {logout, refreshPage, refreshToDashboard} from "./general_functions/generalFunctions";
import {createCollection, createStationCollections, deleteCollection, startSaveCollections} from "./actions/Collection";


if (document.getElementById('app_component')) {

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true
    });

    ReactDOM.render(<Loader/>, document.getElementById('app_component'));

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + Laravel.apiToken;
    axios.defaults.headers.common['Accept'] = 'application/json';

    let store = configureStore();

    let jsx = (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );

    let renderApp = () => ReactDOM.render(jsx, document.getElementById('app_component'));


    Promise.all([store.dispatch(startCheckAuthAndSaveUser()),
                store.dispatch(startSaveCategories()),
                store.dispatch(startSaveStations()),
                store.dispatch(startSaveUsers()),
                store.dispatch(startSaveCollections())
        ])
        .then(values => {
            let result;
            values.forEach(val => {
                if(val === 'error') result = val;
            })
            if(result !== 'error'){
                renderApp();
                //category created (public)
                window.Echo.channel('category').listen('categoryCreated', e => {
                    store.dispatch(createCategory(e.category));
                    notifyGeneralCreatedEl(e.category.name);
                });
                //category edited (public)
                window.Echo.channel('category').listen('categoryEdited', e => {
                    store.dispatch(editCategory(e.category));
                    store.dispatch(editCategoryOnStations(e.category));
                    notifyGeneralEditedEl(e.category.name);
                });
                // category deleted (public)
                window.Echo.channel('category').listen('categoryDeleted', e => {
                    notifyGeneralDeletedEl(e.category.name);
                    setTimeout(()=>refreshPage(), 2000)
                });
                //user created (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('userCreated', e => {
                        store.dispatch(createUser(e.user));
                        notifyGeneralCreatedUser(e.user.email);
                    });
                }
                //user edited (private)
                if(store.getState().user.role_id === 1){
                    window.Echo.private('private_user').listen('userEdited', e => {
                        if(e.user.id !== store.getState().user.id){
                            store.dispatch(editUser(e.user));
                            notifyGeneralEditedUser(e.user.email);
                        }
                    })
                }
                //user edited (public)
                window.Echo.channel('user').listen('userGeneralEdited', e => {
                    if(e.user.id === store.getState().user.id){
                        if(!e.user.is_active){
                            notifyTheInactiveUser();
                            setTimeout(()=>logout(), 2000);
                        }else if(e.user.role_id !== store.getState().user.role_id && e.user.role_id === 1){
                            notifyTheUpgradedUser();
                            setTimeout(()=>refreshToDashboard(), 2000)
                        } else if(e.user.role_id !== store.getState().user.role_id && e.user.role_id === 2){
                            notifyTheDowngradedUser();
                            setTimeout(()=>refreshToDashboard(), 2000)
                        }
                    }
                });
                //user suspended email not sent error, inform all admins (private)
                if(store.getState().user.role_id === 1){
                    window.Echo.private('private_user').listen('informAdminsMailToSuspendedUserNotSendedError', e => {
                        if(store.getState().user.name !== e.name) {
                            notifyAdminsSuspendedUserEmailNotSent(e.name)
                        }
                    })
                }
                //user deleted (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('userDeleted', e => {
                        if(e.user.id !== store.getState().user.id){

                            let completedJobs = 1;

                            //find possible stations that belong to deleted user
                            let deletedUserStations = [];
                            store.getState().stations.forEach(station => {
                                if(station.user_id === e.user.id){
                                    deletedUserStations.push(station.id);
                                    completedJobs = 2;
                                }
                            });
                            //find possible collections that belong to deleted stations
                            let deletedUserStationsCollections = [];
                            store.getState().collections.forEach(collection => {
                                if(deletedUserStations.includes(collection.station_id)){
                                    deletedUserStationsCollections.push(collection.id);
                                    completedJobs = 3;
                                }
                            });
                            //if found collections, delete them
                            if(deletedUserStationsCollections.length){
                                store.dispatch(deleteUserStationsCollections(deletedUserStationsCollections));
                            }
                            //if found stations, delete them
                            if(deletedUserStations.length){
                                store.dispatch(deleteUserStations(deletedUserStations));
                            }
                            //delete user
                            store.dispatch(deleteUser(e.user));
                            notifyGeneralDeletedUser(e.user.email);
                            if(completedJobs === 2){
                                notifyGeneralDeletedUserStations(e.user.email, deletedUserStations);
                            } else if(completedJobs === 3){
                                notifyGeneralDeletedUserStations(e.user.email, deletedUserStations);
                                notifyGeneralDeletedUserCollections(deletedUserStationsCollections);
                            }
                        }
                    });
                }
                //user deleted (public)
                window.Echo.channel('user').listen('userGeneralDeleted', e => {
                    if(e.user.id === store.getState().user.id){
                        notifyTheDeletedUser();
                        setTimeout(()=>logout(), 2000);
                    }
                });
                //user deleted email not sent error, inform all admins (private)
                if(store.getState().user.role_id === 1){
                    window.Echo.private('private_user').listen('informAdminsMailToDeletedUserNotSendedError', e => {
                        if(store.getState().user.name !== e.name) {
                            notifyAdminsDeletedUserEmailNotSent(e.name);
                        }
                    })
                }
                //station created (private)
                if(store.getState().user.role_id === 1){
                    window.Echo.private('private_user').listen('stationCreated', e => {
                        store.dispatch(createStation(e.station));
                        if(e.station.user_id === store.getState().user.id){
                            notifyGeneralCreatedStationWithOwnership(e.station.name);
                        } else {
                            notifyGeneralCreatedStation(e.station.name);
                        }
                    })
                }
                //station created (public)
                window.Echo.channel('station').listen('stationCreatedFromAdminToUser', e => {
                    if(store.getState().user.id === e.station.user_id){
                        store.dispatch(createStation(e.station));
                        notifyGeneralCreatedStationWithOwnership(e.station.name);
                    }
                });
                //station deleted (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('stationDeleted', e => {
                            let completedJobs = 1;

                            //find possible collections that belong to deleted station
                            let deletedStationCollections = [];
                            store.getState().collections.forEach(collection => {
                                if(collection.station_id === e.station.id){
                                    deletedStationCollections.push(collection.id);
                                    completedJobs = 2;
                                }
                            });
                            //if found collections, delete them
                            if(deletedStationCollections.length){
                                store.dispatch(deleteUserStationsCollections(deletedStationCollections));
                            }
                            //delete station
                            store.dispatch(deleteStation(e.station));
                            notifyGeneralDeletedStation(e.station.name);
                            if(completedJobs === 2){
                                notifyGeneralDeletedStationCollections(deletedStationCollections);
                            }
                    });
                }
                //station deleted (public)
                window.Echo.channel('station').listen('stationDeletedBelongToUser', e => {
                    if(store.getState().user.id === e.station.user_id){
                        let completedJobs = 1;

                        //find possible collections that belong to deleted station
                        let deletedStationCollections = [];
                        store.getState().collections.forEach(collection => {
                            if(collection.station_id === e.station.id){
                                deletedStationCollections.push(collection.id);
                                completedJobs = 2;
                            }
                        });
                        //if found collections, delete them
                        if(deletedStationCollections.length){
                            store.dispatch(deleteUserStationsCollections(deletedStationCollections));
                        }
                        //delete station
                        store.dispatch(deleteStation(e.station));
                        notifyGeneralDeletedStation(e.station.name);
                        if(completedJobs === 2){
                            notifyGeneralDeletedStationCollections(deletedStationCollections);
                        }
                    }
                });
                //station edited (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('stationEdited', e => {
                        store.dispatch(editStation(e.station));
                        if(store.getState().user.id === e.station.user_id){
                            notifyGeneralEditedStationWithOwnership(e.station.name);
                        }
                        notifyGeneralEditedStation(e.station.name);
                    });
                }
                //station edited Ownership to user (public)
                window.Echo.channel('station').listen('stationEditedOwnershipToUser', e => {
                    if(store.getState().user.id === e.station.user_id){
                        store.dispatch(createStation(e.station));
                        if(e.collections.length){
                            store.dispatch(createStationCollections(e.collections));
                        }
                        notifyGeneralEditedStationWithOwnership(e.station.name);
                    }
                });
                //station which belong to user, edited Ownership by admin and force deleted (public)
                window.Echo.channel('station').listen('userForcedDeleteOwnStation', e => {
                    if(store.getState().user.id === e.user.id){
                        let completedJobs = 1;

                        //find possible collections that belong to deleted station
                        let deletedStationCollections = [];
                        store.getState().collections.forEach(collection=>{
                            if(e.station.id === collection.station_id){
                                deletedStationCollections.push(collection.id);
                                completedJobs = 2;
                            }
                        });

                        //if found collections, delete them
                        if(deletedStationCollections.length){
                            store.dispatch(deleteUserStationsCollections(deletedStationCollections));
                        }
                        //delete station
                        store.dispatch(deleteStation(e.station));
                        notifyGeneralDeletedStation(e.station.name);
                        if(completedJobs === 2){
                            notifyGeneralDeletedStationCollections(deletedStationCollections);
                        }
                    }
                });
                //station edited belong to user only privacy|activity (public)
                window.Echo.channel('station').listen('stationEditedBelongToUserOnlyPrivacyActivity', e => {
                        if(e.station.user_id === store.getState().user.id){
                            store.dispatch(editStation(e.station));
                            notifyGeneralEditedStation(e.station.name);
                        }
                    });
                //collection created (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('newCollectionWithMeasuresCreated', e => {
                        store.dispatch(createCollection(e.collection));
                        notifyGeneralCreatedCollection(e.stationName);
                    });
                }
                //collection created notify station owner(user) (public)
                window.Echo.channel('collection').listen('newCollectionWithMeasuresCreatedWithUserStationOwner', e => {
                    if( store.getState().user.role_id === 2 &&
                        store.getState().stations.find(station => station.id === e.collection.station_id)){
                            store.dispatch(createCollection(e.collection));
                            notifyGeneralCreatedCollection(e.stationName);
                    }
                });
                //collection created notify general users (only notification message) (public)
                window.Echo.channel('collection').listen('newCollectionWithMeasuresCreatedNotifyUsersGeneral', e => {
                   if(store.getState().user.role_id === 2 &&
                       !store.getState().stations.find(station => station.name === e.stationName)){
                            notifyGeneralCreatedCollection(e.stationName);
                   }
                });
                //collection deleted (private)
                if(store.getState().user.role_id === 1) {
                    window.Echo.private('private_user').listen('collectionDeleted', e => {
                        store.dispatch(deleteCollection(e.collection));
                        notifyGeneralDeletedCollection(e.collection, e.station);
                    });
                }
                //collection deleted belong to user_station (public)
                window.Echo.channel('collection').listen('collectionDeletedBelongToUserStation', e => {
                   if(store.getState().user.id === e.user.id){
                       store.dispatch(deleteCollection(e.collection));
                       notifyGeneralDeletedCollection(e.collection, e.station);
                   }
                });

            } else{
                logout();
            }
    }).catch(e=>logout())
}


// store.dispatch(startCheckAuthAndSaveUser()).then(() => {
//     store.dispatch(startSaveCategories()).then(() => {
//         store.dispatch(startSaveStations()).then(() => {
//             if(store.getState().user.role_id === 1){
//                 store.dispatch(startSaveUsers()).then(()=>{
//                     renderApp();
//                 })
//             } else {
//                 renderApp();
//             }
//

// if(e.response.status === 422 || e.response.status === 404){
//     notifyUnauthorizedAction();
// } else {
//     notifyUnauthorizedAction();
//     setTimeout(()=>{startLogoutUser()}, 1500);
// }


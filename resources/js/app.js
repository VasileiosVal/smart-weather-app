//*******function packages*******
require('./bootstrap');

//*******styling packages*******
require('./ui/perfect-scrollbar.jquery.min');
require('./ui/chartjs.min');
require('./ui/bootstrap-notify');
require('./ui/paper-dashboard');

//*******react configuration*******
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from "./routes/AppRouter";
import {configureStore} from "./configure/configureStore";
import {startLogoutUser, startCheckAuth} from "./actions/Auth";
import {Loader} from "./components/Loader";
import {logout} from "./general_functions/generalFunctions";



// $.notify({
//     // options
//     message: 'Hello World'
// },{
//     // settings
//     type: 'danger'
// });


if (document.getElementById('app_component')) {

    ReactDOM.render(<Loader/>, document.getElementById('app_component'));

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + Laravel.apiToken;

    let store = configureStore();

    let jsx = (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );

    let saveDataAndRenderApp = () => {

        ReactDOM.render(jsx, document.getElementById('app_component'))
    }

    store.dispatch(startCheckAuth()).then(()=>{
        store.getState().checkAuth.auth ?
            saveDataAndRenderApp()
            :
            store.dispatch(startLogoutUser()).then(()=>{
            logout()
        })
    });
}

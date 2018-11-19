//*******function packages*******
require('./bootstrap');

//*******styling packages*******
require('./ui/perfect-scrollbar.jquery.min');
require('./ui/chartjs.min');
require('./ui/bootstrap-notify');
require('./ui/paper-dashboard');





import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';

import {Example} from "./components/Example";
import {Create} from "./components/Create";
import {NotFound} from "./components/NotFound";

let jsx = (
    <BrowserRouter>
        <div>
            <Switch>
            <Route path='/' component={Example} exact={true}/>
            <Route path='/create' component={Create} exact={true}/>
            <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

if (document.getElementById('app')) {
    ReactDOM.render(jsx, document.getElementById('app'));
}

//

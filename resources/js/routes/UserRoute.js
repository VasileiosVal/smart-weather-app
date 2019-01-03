import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";

let UserRoute = ({path, component: Component, isAdmin}) => !isAdmin ? (
            <Route path={path} component={Component} exact/>
        ) : (
            <Redirect to='/dashboard'/>
        );

const mapStateToProps = state => ({
    isAdmin: state.user.role_id === 1
});

export default connect(mapStateToProps)(UserRoute)
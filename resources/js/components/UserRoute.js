import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";

let UserRoute = ({path, component, isAdmin}) => {
    return !isAdmin ? (
            <Route path={path} component={component} exact/>
        )
        :
        <Redirect to='/dashboard'/>
};

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.role_id === 1
    }
};

export default connect(mapStateToProps)(UserRoute)
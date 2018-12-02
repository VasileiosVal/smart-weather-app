import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom'

let AdminRoute = ({path, component, isAdmin}) => {
    return isAdmin ? (
                <Route path={path} component={component} exact/>
            )
        :
            <Redirect to='/dashboard'/>
};

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.role_id === 1
    }
}

export default connect(mapStateToProps)(AdminRoute)
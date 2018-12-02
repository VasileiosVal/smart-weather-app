import React from 'react'
import {connect} from 'react-redux'

const RoleRoute = (props) => {
    // return props.isAdmin ? () : ();
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.role_id === 1
    }
}

export default connect(mapStateToProps)(RoleRoute)
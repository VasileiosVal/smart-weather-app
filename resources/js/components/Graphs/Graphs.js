import React from 'react';
import {connect} from 'react-redux';
import GraphsAdmin from "./GraphsAdmin";
import GraphsUser from "./GraphsUser";

let Graphs = ({isAdmin}) => isAdmin ? (
        <GraphsAdmin/>
        ) : (
         <GraphsUser/>
        );

const mapStateToProps = state => ({
    isAdmin: state.user.role_id === 1
});

export default connect(mapStateToProps)(Graphs)
import React from 'react';
import {connect} from 'react-redux';
import HistoryAdmin from "./HistoryAdmin";
import HistoryUser from "./HistoryUser";

let History = ({isAdmin}) => isAdmin ? (
        <HistoryAdmin/>
        ) : (
        <HistoryUser/>
        );

const mapStateToProps = state => ({
        isAdmin: state.user.role_id === 1
    });

export default connect(mapStateToProps)(History)


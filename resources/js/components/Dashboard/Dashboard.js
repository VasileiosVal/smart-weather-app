import React from 'react';
import {connect} from "react-redux";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";


let Dashboard = ({isAdmin}) => isAdmin ? (
        <DashboardAdmin/>
    ) : (
        <DashboardUser/>
    );

const mapStateToProps = state => ({
        isAdmin: state.user.role_id === 1
    });

export default connect(mapStateToProps)(Dashboard)

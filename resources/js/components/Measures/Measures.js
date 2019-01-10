import React from 'react';
import {connect} from 'react-redux';
import MeasuresAdmin from "./MeasuresAdmin";
import MeasuresUser from "./MeasuresUser";

let Measures = ({isAdmin}) => isAdmin ? (
        <MeasuresAdmin/>
        ) : (
        <MeasuresUser/>
        );

const mapStateToProps = state => ({
        isAdmin: state.user.role_id === 1
    });

export default connect(mapStateToProps)(Measures)


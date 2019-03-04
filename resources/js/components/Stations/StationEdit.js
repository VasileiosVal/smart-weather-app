import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import StationCreateOrEditAdmin from "./StationCreateOrEditAdmin";
import StationCreateOrEditUser from "./StationCreateOrEditUser";
import {CardHeaderTitle} from "../../containers/generalContainers";

let StationEdit = ({isAdmin, station}) => !!station ? (
            <div className="content">
                <div>
                    <CardHeaderTitle name='Σταθμοί'/>
                </div>
                {isAdmin ?
                    <StationCreateOrEditAdmin station={station}/>
                :
                    <StationCreateOrEditUser station={station}/>
                }
            </div>
        ) : <Redirect to='/stations'/>;

const mapStateToProps = (state, props) => ({
        isAdmin: state.user.role_id === 1,
        station: state.stations.find(station => station.name === props.match.params.name && station.user_id === state.user.id)

});

export default connect(mapStateToProps)(StationEdit)
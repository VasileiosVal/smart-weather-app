import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {findUserCollections} from "../../general_functions/generalFunctions";
import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";

let ProfileShowOther = props => props.profile ? (
        <div className="content">
            <div className="row">
                <div className="col-md-4">
                    <ProfileBanner
                        {...props}
                    />
                </div>
                <div className="col-md-8">
                    <ProfileInfo
                        profile={props.profile}
                        edit={false}
                    />
                </div>
            </div>
        </div>
        )
    :
        <Redirect to='/dashboard'/>;

const mapStateToProps = (state, props) => {
    let user = state.users.find(user => user.email === props.match.params.email);
    if(!user || (!!user && user.id === state.user.id)) user = undefined;

    let stations = user ? state.stations.filter(station => station.user_id === user.id) : [];
    let collections = findUserCollections(stations, state.collections);
    return {
        profile: user,
        stations,
        collections
    }
};

export default connect(mapStateToProps)(ProfileShowOther)
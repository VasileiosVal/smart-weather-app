import React from 'react';
import {connect} from "react-redux";
import {findUserCollections} from "../../general_functions/generalFunctions";
import ProfileBanner from "./ProfileBanner";
import ProfileInfoEdit from "./ProfileInfoEdit";


let ProfileEdit = props => (
        <div className="content">
            <div className="row">
                <div className="col-sm-4">
                    <ProfileBanner
                        {...props}
                    />
                </div>
                <div className="col-sm-8">
                    <ProfileInfoEdit/>
                </div>
            </div>
        </div>
);

const mapStateToProps = state => {
    let profile = state.user;
    let stations = state.stations.filter(station=>station.user_id === profile.id);
    let collections = findUserCollections(stations, state.collections);
    return {
        profile,
        stations,
        collections
    }
};

export default connect(mapStateToProps)(ProfileEdit)
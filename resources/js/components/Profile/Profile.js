import React from 'react';
import {connect} from 'react-redux';
import ModalProfileDelete from "./ModalProfileDelete";
import {startDeleteProfile} from "../../actions/User";
import {notifyDeleteProfile} from "../../general_functions/notifiers";
import {findUserCollections, logout} from "../../general_functions/generalFunctions";
import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";

class Profile extends React.Component {
    state = {
        deleteProfileEmail: undefined
    };

    deleteProfile = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteProfile(this.state.deleteProfileEmail)).then(()=>{
        notifyDeleteProfile();
        setTimeout(()=>logout(), 1500);
        })
    }
    clearDeleteValue = () => this.setState({deleteProfileEmail: undefined});

    render(){

        //******PROFILE BANNER
        let profileBanner = (
            <ProfileBanner
                {...this.props}
            />
        );

        //******PROFILE INFO
        let profileInfo = (
            <ProfileInfo
                profile={this.props.profile}
                edit={true}
                onClickDelete={email => this.setState({deleteProfileEmail: email}, ()=>$('#modal').modal())}
            />
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let modalForDelete = (
            this.props.profile.id !== 1 && !!this.state.deleteProfileEmail &&
            <ModalProfileDelete
                onDeleteProfile={this.deleteProfile}
                onClickClearDeleteValue={this.clearDeleteValue}
            />
        );

        return (
            <div className="content">
                <div className="row">
                    <div className="col-md-4">
                        {profileBanner}
                    </div>
                    <div className="col-md-8">
                        {profileInfo}
                    </div>
                </div>
                {modalForDelete}
            </div>
        );
    }
}

const mapStateToProps = state => {
    let profile = state.user;
    let stations = state.stations.filter(station => station.user_id === profile.id);
    let collections = findUserCollections(stations, state.collections);
    return {
        profile,
        stations,
        collections
    }
};

export default connect(mapStateToProps)(Profile)
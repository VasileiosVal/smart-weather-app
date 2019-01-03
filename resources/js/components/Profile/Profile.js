import React from 'react';
import {connect} from 'react-redux';
import ModalProfileDelete from "./ModalProfileDelete";
import {startDeleteProfile} from "../../actions/User";
import {notifyDeleteProfile} from "../../general_functions/notifiers";
import {findUserCollections, logout} from "../../general_functions/generalFunctions";
import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";

class Profile extends React.Component{
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

    render(){

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let modalForDelete = this.props.profile.id !== 1 && this.state.deleteProfileEmail &&
            <ModalProfileDelete
                deleteProfile={this.deleteProfile}
            />;

        return (
            <div className="content">
                <div className="row">
                    <div className="col-sm-4">
                        <ProfileBanner
                            {...this.props}
                        />
                    </div>
                    <div className="col-sm-8">
                        <ProfileInfo
                            profile={this.props.profile}
                            edit={true}
                            onClickDelete={email=>this.setState({deleteProfileEmail: email}, ()=>$('#modal').modal())}
                        />
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
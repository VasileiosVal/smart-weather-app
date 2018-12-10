import React from 'react';
import {connect} from "react-redux";
import ProfileEditDetails from "./ProfileEditDetails";
import ProfileEditPassword from "./ProfileEditPassword";

class ProfileEdit extends React.Component{
    render(){
        return (
            <div className="content">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card card-user">
                            <div className="image">
                                <img src="../img/background.jpg" alt=""/>
                            </div>
                            <div className="card-body">
                                <div className="author">
                                    <a href="#">
                                        <img className='img-fluid avatar border-gray' src="../img/sample.jpeg" alt=""/>
                                        <h5 className="title mt-2">{this.props.profile.name} {this.props.profile.surname}</h5>
                                    </a>
                                    <p className="description">
                                        {this.props.profile.email}
                                    </p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <hr/>
                                <div className="button-container">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6 col-6 ml-auto">
                                            <h5>{this.props.stations.length}
                                                <br/>
                                                <small>Σταθμοί</small>
                                            </h5>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-6 ml-auto mr-auto">
                                            <h5>2GB
                                                <br/>
                                                <small>Συλλογές μετρήσεων</small>
                                            </h5>
                                        </div>
                                        <div className="col-lg-3 mr-auto">
                                            <h5>24,6$
                                                <br/>
                                                <small>Μετρήσεις</small>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="row">
                            <div className="col-3">
                                <div className="nav flex-column nav-pills bg-light" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Στοιχεία χρήστη</a>
                                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Κωδικός πρόσβασης</a>

                                </div>
                            </div>
                            <div className="col-9">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <ProfileEditDetails/>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <ProfileEditPassword/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      profile: state.user,
      stations: state.stations.filter((station)=>station.user_id === state.user.id)
  }
};

export default connect(mapStateToProps)(ProfileEdit)
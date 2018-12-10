import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import ModalProfileDelete from "./ModalProfileDelete";
import {startDeleteProfile} from "../actions/User";
import {notifyDeleteProfile} from "../general_functions/notifiers";
import {logout} from "../general_functions/generalFunctions";
import {Link} from "react-router-dom";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.state = {
            deleteProfileEmail: undefined
        }
    }
    deleteProfile(){
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteProfile(this.state.deleteProfileEmail)).then(()=>{
        notifyDeleteProfile();
        setTimeout(()=>{logout()}, 1500);
        })
    }
    render(){
        return (
            <div className="content">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card card-user">
                            <div className="image">
                                <img src="./img/background.jpg" alt=""/>
                            </div>
                            <div className="card-body">
                                <div className="author">
                                    <a href="#">
                                        <img className='img-fluid avatar border-gray' src="./img/sample.jpeg" alt=""/>
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
                        <div className="card">
                            <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                <h4 className="text-center">Προφίλ</h4>
                            </div>
                            <hr/>
                            <div className="card-body">
                                <div className="row mb-1">
                                    <div className="col-sm-6 offset-sm-3">
                                        <div className="form-group">
                                            <label>Διεύθυνση Email</label>
                                            <h5 className='border border-white bg-light'>{this.props.profile.email}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Όνομα</label>
                                            <h5 className='border border-white bg-light'>{this.props.profile.name}</h5>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Επίθετο</label>
                                            <h5 className='border border-white bg-light'>{this.props.profile.surname}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-sm-6 offset-sm-3">
                                        <div className="form-group">
                                            <label>Κατηγορία</label>
                                            <h5 className='border border-white bg-light'>{this.props.profile.role_id === 1 ? 'Διαχειριστής' : 'Χρήστης'}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Ενεργός</label>
                                            <h5 className='border border-white bg-light'>{this.props.profile.is_active? 'Ναι' : 'Οχι'}</h5>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Ημερομηνία επιβεβαίωσης λογαριασμού</label>
                                            <h5 className='border border-white bg-light'>{moment(this.props.profile.confirmed).format('LL')}  ({moment(this.props.profile.confirmed).fromNow()})</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-sm-6 offset-sm-3">
                                        <div className="form-group">
                                            <label>Ημερομηνία δημιουργίας λογαριασμού</label>
                                            <h5 className='border border-white bg-light'>{moment(this.props.profile.created_at).format('LL')}  ({moment(this.props.profile.created_at).fromNow()})</h5>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row my-2">
                                    <div className="col-sm-12 d-flex align-items-center justify-content-around">
                                        <Link to='/profile/edit' className="btn btn-info btn-round">Επεξεργασία λογαριασμού</Link>
                                        {this.props.profile.id !== 1 &&
                                        <button onClick={()=>{
                                            this.setState({
                                                deleteProfileEmail: this.props.profile.email}, ()=>{
                                                $('#modal').modal();
                                            })
                                        }} className="btn btn-danger btn-round">Διαγραφή λογαριασμού</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.profile.id !== 1 && this.state.deleteProfileEmail &&
                <ModalProfileDelete deleteProfile={this.deleteProfile}/>
                }
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

export default connect(mapStateToProps)(Profile)
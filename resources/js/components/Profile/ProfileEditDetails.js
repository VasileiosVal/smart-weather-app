import React from 'react';
import {connect} from "react-redux";
import * as EmailValidator from 'email-validator';
import {
    notifyEditedUserEmptyFields, notifyInvalidEmailOnInput, notifyNoChangesMade,
    notifyUpdatedProfile
} from "../../general_functions/notifiers";
import {startEditProfileDetails} from "../../actions/User";
import {withRouter} from "react-router-dom";
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

class ProfileEditDetails extends React.Component {
    state = {
        email: this.props.profile.email,
        name: this.props.profile.name,
        surname: this.props.profile.surname
    };

    changeValue = e => this.setState({[e.target.name]: e.target.value});

    submit = e => {
        e.preventDefault();
        let email = this.state.email.trim();
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();

        if(!email || !name || !surname){
            notifyEditedUserEmptyFields();
        }else if(!EmailValidator.validate(email)){
            notifyInvalidEmailOnInput();
        }else{
            this.props.dispatch(startEditProfileDetails(this.props.profile.email, email, name, surname)).then((val=0)=>{
                if(val !== 1){
                    if(val === 'same'){
                        notifyNoChangesMade();
                    }else {
                        notifyUpdatedProfile();
                        this.props.history.push('/profile');
                    }
                }
            })
        }
    }

    render(){
        return (
            <div className="card">
                <CardBelowHeaderTitle name='Change user details'/>
                <hr/>
                <div className="card-body">
                    <form onSubmit={this.submit}>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="text" value={this.state.email} onChange={this.changeValue}  name='email' className="form-control" placeholder="Fill in your Email address..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={this.state.name} onChange={this.changeValue}  name='name' className="form-control" placeholder="Fill in your name..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Surname</label>
                                    <input type="text" value={this.state.surname} onChange={this.changeValue}  name='surname' className="form-control" placeholder="Fill in your surname..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="update ml-auto mr-auto">
                                <button className="btn btn-primary btn-round">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        profile: state.user
    });

export default withRouter(connect(mapStateToProps)(ProfileEditDetails))
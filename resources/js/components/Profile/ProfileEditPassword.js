import React from 'react';
import {connect} from "react-redux";
import {
    notifyBiggerPasswordsInUserFields, notifyDiffPasswordsInUserFields,
    notifyEditedUserPasswordEmptyFields, notifyUpdatedProfile
} from "../../general_functions/notifiers";
import {startEditProfilePassword} from "../../actions/User";
import {withRouter} from "react-router-dom";
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

class ProfileEditPassword extends React.Component {
    state = {
        password: '',
        newPassword: '',
        newPasswordConfirmation: ''
    };

    clearInputs = () => this.setState({password: '', newPassword: '', newPasswordConfirmation: ''});
    changeValue = e => this.setState({[e.target.name]: e.target.value});

    submit = e => {
        e.preventDefault();
        let oldPassword = this.state.password.trim();
        let newPassword = this.state.newPassword.trim();
        let newPasswordConfirm = this.state.newPasswordConfirmation.trim();
        if(!oldPassword || !newPassword || !newPasswordConfirm){
            notifyEditedUserPasswordEmptyFields();
        }else if(newPassword !== newPasswordConfirm){
            notifyDiffPasswordsInUserFields();
        }else if(oldPassword.length < 6 || newPassword.length < 6 || newPasswordConfirm.length < 6){
            notifyBiggerPasswordsInUserFields();
        }else{
            this.props.dispatch(startEditProfilePassword(this.props.profile.email, oldPassword, newPassword, newPasswordConfirm)).then((ans=0)=>{
                if(ans === 1){
                    this.clearInputs();
                }else{
                notifyUpdatedProfile();
                this.props.history.push('/profile');
                }
            })

        }
    }

    render(){
        return (
            <div className="card">
                <CardBelowHeaderTitle name='Change password'/>
                <hr/>
                <div className="card-body">
                    <form id='form-data' onSubmit={this.submit}>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" name='password' value={this.state.password} onChange={this.changeValue} className="form-control" placeholder="Fill in your current password..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>New password</label>
                                    <input type="password" name='newPassword' value={this.state.newPassword} onChange={this.changeValue} className="form-control" placeholder="Fill in your new password..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>New password verification</label>
                                    <input type="password" name='newPasswordConfirmation' value={this.state.newPasswordConfirmation} onChange={this.changeValue} className="form-control" placeholder="Fill in again your new password..." autoComplete='off'/>
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

export default withRouter(connect(mapStateToProps)(ProfileEditPassword))
import React from 'react';
import {connect} from "react-redux";
import {
    notifyBiggerPasswordsInUserFields, notifyDiffPasswordsInUserFields,
    notifyEditedUserPasswordEmptyFields, notifyUpdatedProfile
} from "../general_functions/notifiers";
import {startEditProfilePassword} from "../actions/User";
import {withRouter} from "react-router-dom";

class ProfileEditPassword extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeNewPassword = this.changeNewPassword.bind(this);
        this.changeNewPasswordConfirmation = this.changeNewPasswordConfirmation.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.state = {
            password: '',
            newPassword: '',
            newPasswordConfirmation: '',
        }
    }
    clearInputs(){
        this.setState({password: '', newPassword: '', newPasswordConfirmation: ''})
    }
    changePassword(e){
        this.setState({password: e.target.value})
    }
    changeNewPassword(e){
        this.setState({newPassword: e.target.value})
    }
    changeNewPasswordConfirmation(e){
        this.setState({newPasswordConfirmation: e.target.value})
    }
    submit(e){
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
                this.props.history.push('/profile')
                }
            })

        }
    }
    render(){
        return (
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">Αλλαγή κωδικού πρόσβασης</h4>
                </div>
                <hr/>
                <div className="card-body">
                    <form id='form-data' onSubmit={this.submit}>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Κωδικός πρόσβασης</label>
                                    <input type="password" name='password' value={this.state.password} onChange={this.changePassword} className="form-control" placeholder="Συμπληρώστε τον κωδικό πρόσβασης..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Νέος κωδικός πρόσβασης</label>
                                    <input type="password" name='newPassword' value={this.state.newPassword} onChange={this.changeNewPassword} className="form-control" placeholder="Συμπληρώστε τον νέο κωδικό πρόσβασης..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-sm-8 offset-sm-2">
                                <div className="form-group">
                                    <label>Επαλήθευση νέου κωδικού</label>
                                    <input type="password" name='newPasswordConfirmation' value={this.state.newPasswordConfirmation} onChange={this.changeNewPasswordConfirmation} className="form-control" placeholder="Συμπληρώστε ξανά τον νέο κωδικό πρόσβασης..." autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="update ml-auto mr-auto">
                                <button className="btn btn-primary btn-round">Ενημέρωση</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.user
    }
}

export default withRouter(connect(mapStateToProps)(ProfileEditPassword))
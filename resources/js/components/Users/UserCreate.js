import React from 'react';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import {
    notifyBiggerPasswordsInUserFields, notifyCreatedUser, notifyDiffPasswordsInUserFields,
    notifyFormEmptyUserFields, notifyInvalidEmailOnInput, notifyUserEmailExists
} from "../../general_functions/notifiers";
import {startCreateUser} from "../../actions/User";
import {CardBelowHeaderTitle, CardHeaderTitle} from "../../containers/generalContainers";
import UserCreateForm from "./UserCreateForm";

class UserCreate extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target.elements.email.value.trim();
        let name =  e.target.elements.name.value.trim();
        let surname = e.target.elements.surname.value.trim();
        let password = e.target.elements.password.value.trim();
        let password_confirmation = e.target.elements.password_confirmation.value.trim();
        let role_id = e.target.elements.category.value.trim();
        if(!email || !name || !surname || !password || !password_confirmation || !role_id){
            notifyFormEmptyUserFields();
        } else if(password !== password_confirmation) {
            notifyDiffPasswordsInUserFields();
        } else if(password.length < 6 || password_confirmation.length < 6) {
            notifyBiggerPasswordsInUserFields();
        }else if(!EmailValidator.validate(email)){
            notifyInvalidEmailOnInput();
        } else {
            let foundUser = this.props.users.find(user=>user.email === email);
            if(foundUser){
                notifyUserEmailExists();
            } else {
                role_id = parseInt(role_id);
                this.props.dispatch(startCreateUser(email, password, password_confirmation, name, surname, role_id))
                    .then(()=>{
                        notifyCreatedUser();
                        this.props.history.push('/users');
                })
            }
        }
    }
    render(){
        return (
            <div className="content">
                <CardHeaderTitle name='Χρήστες'/>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <CardBelowHeaderTitle name='Δημιουργία χρήστη'/>
                            <hr/>
                            <div className="card-body">
                                <UserCreateForm onSubmitForm={this.handleSubmit}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
        users: state.users
    });

export default connect(mapStateToProps)(UserCreate)
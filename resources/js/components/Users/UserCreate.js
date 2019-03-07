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
    state = {
        email: '',
        name: '',
        surname: '',
        password: '',
        password_confirmation: '',
        role_id: ''
    };

    handleChangeValue = e => this.setState({[e.target.name]: e.target.value});
    handleSubmitForm = e => {
        e.preventDefault();
        let email = this.state.email.trim();
        let name =  this.state.name.trim();
        let surname = this.state.surname.trim();
        let password = this.state.password.trim();
        let password_confirmation = this.state.password_confirmation.trim();
        let role_id = this.state.role_id.trim();
        if(!email || !name || !surname || !password || !password_confirmation || !role_id){
            notifyFormEmptyUserFields();
        } else if(password !== password_confirmation) {
            notifyDiffPasswordsInUserFields();
        } else if(password.length < 6 || password_confirmation.length < 6) {
            notifyBiggerPasswordsInUserFields();
        }else if(!EmailValidator.validate(email)){
            notifyInvalidEmailOnInput();
        } else {
            let foundUser = this.props.users.find(user => user.email === email);
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

        //******CREATE USER FORM
        let userCreateForm = (
            <UserCreateForm
                {...this.state}
                onChangeValue={this.handleChangeValue}
                onSubmitForm={this.handleSubmitForm}
            />
        );

        return (
            <div className="content">
                <CardHeaderTitle name='Users'/>
                <div className="row">
                    <div className="col-12">
                        <div className="card animated fadeIn fast">
                            <CardBelowHeaderTitle name='User creation'/>
                            <hr/>
                            <div className="card-body">
                                {userCreateForm}
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
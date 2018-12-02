import React from 'react';
import {connect} from 'react-redux';
import {
    notifyBiggerPasswordsInUserFields, notifyCreatedUser, notifyDiffPasswordsInUserFields,
    notifyFormEmptyUserFields, notifyUserEmailExists
} from "../general_functions/notifiers";
import {startCreateUser} from "../actions/User";

class UserCreate extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.preventDefault();
        let email = e.target.elements.email.value.trim();
        let name =  e.target.elements.name.value.trim();
        let surname = e.target.elements.surname.value.trim();
        let password = e.target.elements.password.value.trim();
        let password_confirmation = e.target.elements.password_confirmation.value.trim();
        let role_id = parseInt(e.target.elements.category.value.trim());
        if(!email || !name || !surname || !password || !password_confirmation || !role_id){
            notifyFormEmptyUserFields();
        } else if(password !== password_confirmation) {
            notifyDiffPasswordsInUserFields();
        } else if(password.length < 6 || password_confirmation.length < 6) {
            notifyBiggerPasswordsInUserFields();
        } else {
            let foundUser = this.props.users.find((user)=>{
                return user.email === email;
            });
            if(foundUser){
                notifyUserEmailExists();
            } else {
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
                <div>
                    <h5 className="card-title text-center">Χρήστες</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Δημιουργία χρήστη</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                <form id='form-data' onSubmit={this.submit}>
                                    <div className="row mb-1">
                                        <div className="col-sm-6 offset-sm-3">
                                            <div className="form-group">
                                                <label>Διεύθυνση Email</label>
                                                <input type="email" name='email' className="form-control" placeholder="Συμπληρώστε την διεύθυνση Email..." autoComplete='off'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Kωδικός πρόσβασης</label>
                                                <input type="password" name='password' className="form-control" placeholder="Συμπληρώστε τον κωδικό πρόσβασης..." autoComplete='off'/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 mb-1">
                                            <div className="form-group">
                                                <label>Επαλήθευση κωδικού</label>
                                                <input type="password" name='password_confirmation' className="form-control" placeholder="Συμπληρώστε ξανά τον κωδικό πρόσβασης..." autoComplete='off'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Όνομα</label>
                                                <input type="text" name='name' className="form-control" placeholder="Συμπληρώστε το όνομα σας..." autoComplete='off'/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Επίθετο</label>
                                                <input type="text" name='surname' className="form-control" placeholder="Συμπληρώστε το επίθετο σας..." autoComplete='off'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-sm-6 offset-sm-3">
                                            <div className="form-group">
                                                <label>Κατηγορία</label>
                                                <select name='category' className='form-control'>
                                                    <option value=''>Διαλέξτε κατηγορία...</option>
                                                    <option value='1'>Διαχειριστής</option>
                                                    <option value='2'>Χρήστης</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="update ml-auto mr-auto">
                                            <button className="btn btn-primary btn-round">Δημιουργία</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

export default connect(mapStateToProps)(UserCreate)
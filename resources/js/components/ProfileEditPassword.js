import React from 'react';
import {connect} from "react-redux";

class ProfileEditPassword extends React.Component {
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
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

export default connect(mapStateToProps)(ProfileEditPassword)
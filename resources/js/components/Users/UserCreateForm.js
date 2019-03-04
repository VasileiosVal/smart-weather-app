import React from 'react';

let UserCreateForm = ({email, name, surname, password, password_confirmation, role_id, onChangeValue, onSubmitForm}) => (
    <form id='form-data' onSubmit={onSubmitForm}>
        <div className="row mb-1">
            <div className="col-sm-6 offset-sm-3">
                <div className="form-group">
                    <label>Διεύθυνση Email</label>
                    <input type="text" name='email' value={email} onChange={onChangeValue} className="form-control" placeholder="Συμπληρώστε την διεύθυνση Email..." autoComplete='off'/>
                </div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Kωδικός πρόσβασης</label>
                    <input type="password" name='password' value={password} onChange={onChangeValue} className="form-control" placeholder="Συμπληρώστε τον κωδικό πρόσβασης..." autoComplete='off'/>
                </div>
            </div>
            <div className="col-sm-6 mb-1">
                <div className="form-group">
                    <label>Επαλήθευση κωδικού</label>
                    <input type="password" name='password_confirmation' value={password_confirmation} onChange={onChangeValue} className="form-control" placeholder="Συμπληρώστε ξανά τον κωδικό πρόσβασης..." autoComplete='off'/>
                </div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Όνομα</label>
                    <input type="text" name='name' value={name} onChange={onChangeValue} className="form-control" placeholder="Συμπληρώστε το όνομα σας..." autoComplete='off'/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Επίθετο</label>
                    <input type="text" name='surname' value={surname} onChange={onChangeValue} className="form-control" placeholder="Συμπληρώστε το επίθετο σας..." autoComplete='off'/>
                </div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-sm-6 offset-sm-3">
                <div className="form-group">
                    <label>Κατηγορία</label>
                    <select name='role_id' value={role_id} onChange={onChangeValue} className='form-control'>
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
);

export default UserCreateForm
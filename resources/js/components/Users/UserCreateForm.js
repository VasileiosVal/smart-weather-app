import React from 'react';

let UserCreateForm = ({email, name, surname, password, password_confirmation, role_id, onChangeValue, onSubmitForm}) => (
    <form id='form-data' onSubmit={onSubmitForm}>
        <div className="row mb-1">
            <div className="col-sm-6 offset-sm-3">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" name='email' value={email} onChange={onChangeValue} className="form-control" placeholder={`Fill in Email address...`} autoComplete='off'/>
                </div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name='password' value={password} onChange={onChangeValue} className="form-control" placeholder={`Fill in password...`} autoComplete='off'/>
                </div>
            </div>
            <div className="col-sm-6 mb-1">
                <div className="form-group">
                    <label>Password confirmation</label>
                    <input type="password" name='password_confirmation' value={password_confirmation} onChange={onChangeValue} className="form-control" placeholder={`Fill in password again...`} autoComplete='off'/>
                </div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name='name' value={name} onChange={onChangeValue} className="form-control" placeholder={`Fill in name...`} autoComplete='off'/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" name='surname' value={surname} onChange={onChangeValue} className="form-control" placeholder={`Fill in surname...`} autoComplete='off'/>
                </div>
            </div>
        </div>
        <div className="row mb-1">
            <div className="col-sm-6 offset-sm-3">
                <div className="form-group">
                    <label>Identity</label>
                    <select name='role_id' value={role_id} onChange={onChangeValue} className='form-control'>
                        <option value=''>Choose category...</option>
                        <option value='1'>Administrator</option>
                        <option value='2'>User</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="update ml-auto mr-auto">
                <button className="btn btn-primary btn-round">Create</button>
            </div>
        </div>
    </form>
);

export default UserCreateForm
import React from 'react';


let StationAllEdit = props => props.showEditComp && (
        <div className="editUser card animated fadeInDown delay-0.5s">
            <span className='closeButton' onClick={props.closeEdit}><i className="fas fa-times"/></span>
            <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                <h4 className="text-center">Edit station: {props.editStation}</h4>
            </div>
            <hr/>
            <div className="card-body text-center">
                <form onSubmit={props.edit}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Ownership</label>
                                <select name='user_id' value={props.user_id} onChange={props.onChangeValue} className='form-control'>
                                    {props.users.map(user => (
                                        <option key={user.id} value={user.id}>
                                        {user.id === props.profile.id ? `The same (${props.profile.email})` : user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Active</label>
                                <select name='is_active' value={props.is_active} onChange={props.onChangeValue} className='form-control'>
                                    <option value='1'>Yes</option>
                                    <option value='0'>No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>View</label>
                                <select name='privacy' value={props.privacy} onChange={props.onChangeValue} className='form-control'>
                                    <option value='public'>Public</option>
                                    <option value='private'>Private</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className=" btn btn-primary btn-round">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );

export default StationAllEdit

import React from 'react';

// users={props.users}
//ok closeEdit={closeEditComp}
// edit={editUser}/>

let StationAllEdit = (props) => {
    return props.showEditComp && (
        <div className="editUser card animated fadeInDown delay-0.5s">
            <span className='closeButton' onClick={props.closeEdit}><i className="fas fa-times"/></span>
            <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                <h4 className="text-center">Επεξεργασία σταθμού: {props.editCompStationName}</h4>
            </div>
            <hr/>
            <div className="card-body text-center">
                <form onSubmit={props.edit}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Ιδιοκτησία</label>
                                <select name='user_id' value={props.editCompStationUserId} onChange={props.changeUserId} className='form-control'>
                                    {props.users.map((user)=>{
                                        return <option key={user.id} value={user.id}>{user.id === props.profile.id ? `Ο ίδιος (${props.profile.email})` : user.email}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Ενεργός</label>
                                <select name='is_active' value={props.editCompStationIsActive} onChange={props.changeIsActive} className='form-control'>
                                    <option value='1'>Ναι</option>
                                    <option value='0'>Οχι</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Προβολή</label>
                                <select name='privacy' value={props.editCompStationPrivacy} onChange={props.changePrivacy} className='form-control'>
                                    <option value='public'>Δημόσιος</option>
                                    <option value='private'>Ιδιωτικός</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className=" btn btn-primary btn-round">Ενημέρωση</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StationAllEdit

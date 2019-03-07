import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment/moment";
import {CardBelowHeaderTitle} from "../../containers/generalContainers";


let ProfileInfo = ({profile, edit=false, onClickDelete}) => (
    <div className="card animated fadeInRight fast">
        <CardBelowHeaderTitle name='Profile'/>
        <hr/>
        <div className="card-body">
            <div className="row mb-1">
                <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>Email address</label>
                        <h5 className='border border-white bg-light'>{profile.email}</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Name</label>
                        <h5 className='border border-white bg-light'>{profile.name}</h5>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Surname</label>
                        <h5 className='border border-white bg-light'>{profile.surname}</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>Identity</label>
                        <h5 className='border border-white bg-light'>{profile.id === 1 ? 'Creator' : profile.role_id === 1 ? 'Administrator' : 'User'}</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Active</label>
                        <h5 className='border border-white bg-light'>{profile.is_active ? 'Yes' : 'No'}</h5>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Account verification date</label>
                        <h5 className='border border-white bg-light'>{moment(profile.confirmed).format('dddd, D MMMM YY')}  ({moment(profile.confirmed).fromNow()})</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>Account creation date</label>
                        <h5 className='border border-white bg-light'>{moment(profile.created_at).format('dddd, D MMMM YY')}  ({moment(profile.created_at).fromNow()})</h5>
                    </div>
                </div>
            </div>
            {edit &&
            <React.Fragment>
            <hr/>
            <div className="row my-2">
                <div className="col-sm-12 d-flex align-items-center justify-content-around">
                    <Link to='/profile/edit' className="btn btn-info btn-round">Edit Account</Link>
                    {profile.id !== 1 &&
                    <button onClick={()=>onClickDelete(profile.email)} className="btn btn-danger btn-round">Delete Account</button>
                    }
                </div>
            </div>
            </React.Fragment>
            }
        </div>
    </div>
);

export default ProfileInfo
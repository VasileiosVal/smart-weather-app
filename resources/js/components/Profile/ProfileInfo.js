import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment/moment";
import {CardBelowHeaderTitle} from "../../containers/generalContainers";


let ProfileInfo = props => (
    <div className="card">
        <CardBelowHeaderTitle name='Προφίλ'/>
        <hr/>
        <div className="card-body">
            <div className="row mb-1">
                <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>Διεύθυνση Email</label>
                        <h5 className='border border-white bg-light'>{props.profile.email}</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Όνομα</label>
                        <h5 className='border border-white bg-light'>{props.profile.name}</h5>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Επίθετο</label>
                        <h5 className='border border-white bg-light'>{props.profile.surname}</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>Κατηγορία</label>
                        <h5 className='border border-white bg-light'>{props.profile.id === 1 ? 'Δημιουργός' : props.profile.role_id === 1 ? 'Διαχειριστής' : 'Χρήστης'}</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Ενεργός</label>
                        <h5 className='border border-white bg-light'>{props.profile.is_active? 'Ναι' : 'Οχι'}</h5>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Ημερομηνία επιβεβαίωσης λογαριασμού</label>
                        <h5 className='border border-white bg-light'>{moment(props.profile.confirmed).format('dddd, D MMMM YY')}  ({moment(props.profile.confirmed).fromNow()})</h5>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-sm-6 offset-sm-3">
                    <div className="form-group">
                        <label>Ημερομηνία δημιουργίας λογαριασμού</label>
                        <h5 className='border border-white bg-light'>{moment(props.profile.created_at).format('dddd, D MMMM YY')}  ({moment(props.profile.created_at).fromNow()})</h5>
                    </div>
                </div>
            </div>
            {props.edit &&
            <React.Fragment>
            <hr/>
            <div className="row my-2">
                <div className="col-sm-12 d-flex align-items-center justify-content-around">
                    <Link to='/profile/edit' className="btn btn-info btn-round">Επεξεργασία λογαριασμού</Link>
                    {props.profile.id !== 1 &&
                    <button onClick={()=>props.onClickDelete(props.profile.email)} className="btn btn-danger btn-round">Διαγραφή λογαριασμού</button>
                    }
                </div>
            </div>
            </React.Fragment>
            }
        </div>
    </div>
);

export default ProfileInfo
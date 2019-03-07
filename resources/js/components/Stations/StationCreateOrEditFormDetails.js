import React from 'react';
import {greekCapitalCities} from '../../general_functions/cities';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let StationCreateOrEditFormDetails = props => (
    <div className="card animated fadeIn faster">
        <CardBelowHeaderTitle name={props.lastName ? `Edit station: ${props.lastName}` : 'Station creation'}/>
        <hr/>
        <div className="card-body">
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name='name' value={props.name} onChange={props.onChangeValue} className="form-control" placeholder={`Fill in station's name...`} autoComplete='off'/>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Unique code</label>
                        <input type="text" name='unique' value={props.unique} onChange={props.onChangeValue} className="form-control" placeholder={`Fill in station's unique code...`} autoComplete='off'/>
                    </div>
                </div>
            </div>
            {props.showOwnership &&
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Ownership</label>
                        <select name='user_id' value={props.user_id} onChange={props.onChangeValue} className="form-control">
                            {props.user_id === '' &&
                            <option value=''>Select station's ownership</option>
                            }
                            {props.users.map(user => <option key={user.id} value={user.id}>
                                {user.id === props.profile.id ?
                                `The same (${user.email})` :
                                user.email }
                                </option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            }
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Location (City)</label>
                        <select name='location' value={props.location} onChange={props.onChangeValue} className="form-control">
                            {props.location === '' &&
                            <option value=''>Select the city that station is located</option>
                            }
                            {greekCapitalCities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Active</label>
                        <select name='is_active' value={props.is_active} onChange={props.onChangeValue} className="form-control">
                            {props.is_active === '' &&
                            <option value=''>Select from below</option>
                            }
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>View</label>
                        <select name='privacy' value={props.privacy} onChange={props.onChangeValue} className="form-control">
                            {props.privacy === '' &&
                            <option value=''>Select from below</option>
                            }
                            <option value='public'>Public</option>
                            <option value='private'>Private</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Description (optionally)</label>
                        <textarea name='description' value={props.description} onChange={props.onChangeValue} className="form-control" placeholder="Fill in some facts you want to report about the station..." autoComplete='off'/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="update ml-auto mr-auto">
                    <button className="btn btn-primary btn-round">{props.lastName ? 'Update' : 'Create' }</button>
                </div>
            </div>
        </div>
    </div>
);

export default StationCreateOrEditFormDetails

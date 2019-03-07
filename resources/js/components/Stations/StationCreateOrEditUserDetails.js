import React from 'react';
import {greekCapitalCities} from '../../general_functions/cities';

let StationCreateOrEditUserDetails = props => (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">{props.lastName ? 'Edit station' : 'Station creation'}</h4>
                </div>
                <hr/>
                <div className="card-body">
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name='name' value={props.name} onChange={props.changeName} className="form-control" placeholder={`Fill in station's name...`} autoComplete='off'/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Unique code</label>
                                <input type="text" name='unique' value={props.unique} onChange={props.changeUnique} className="form-control" placeholder={`Fill in station's unique code...`} autoComplete='off'/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Location (City)</label>
                                <select name='location' value={props.location} onChange={props.changeLocation} className='form-control'>
                                    {props.location === '' &&
                                    <option value=''>Select the city that station is located</option>
                                    }
                                    {greekCapitalCities.map((city)=>{
                                        return <option key={city} value={city}>{city}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-xl-10 offset-xl-1">
                            <div className="form-group">
                                <label>Active</label>
                                <select name='is_active' value={props.is_active} onChange={props.changeIsActive} className="form-control">
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
                                <select name='privacy' value={props.privacy} onChange={props.changePrivacy} className="form-control">
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
                                <textarea name='description' value={props.description} onChange={props.changeDescription} className="form-control" placeholder="Fill in some facts you want to report about the station..." autoComplete='off'/>
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
        </div>
    );

export default StationCreateOrEditUserDetails

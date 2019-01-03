import React from 'react';
import {greekCapitalCities} from '../../general_functions/cities';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let StationCreateOrEditFormDetails = props => (
    <div className="card">
        <CardBelowHeaderTitle name={props.lastName ? `Επεξεργασία σταθμού: ${props.lastName}` : 'Δημιουργία σταθμού'}/>
        <hr/>
        <div className="card-body">
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Όνομα</label>
                        <input type="text" name='name' value={props.name} onChange={props.onChangeValue} className="form-control" placeholder="Συμπληρώστε το όνομα του σταθμού..." autoComplete='off'/>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Μοναδικός κωδικός</label>
                        <input type="text" name='unique' value={props.unique} onChange={props.onChangeValue} className="form-control" placeholder="Συμπληρώστε τον μοναδικό κωδικό του σταθμού..." autoComplete='off'/>
                    </div>
                </div>
            </div>
            {props.showOwnership &&
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Ιδιοκτησία</label>
                        <select name='user_id' value={props.user_id} onChange={props.onChangeValue} className="form-control">
                            {props.user_id === '' &&
                            <option value=''>Επιλέξτε ιδιοκτήτη σταθμού</option>
                            }
                            {props.users.map(user => <option key={user.id} value={user.id}>
                                {user.id === props.profile.id ?
                                `Ο ίδιος (${user.email})` :
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
                        <label>Τοποθεσία (Πόλη)</label>
                        <select name='location' value={props.location} onChange={props.onChangeValue} className="form-control">
                            {props.location === '' &&
                            <option value=''>Επιλέξτε την πόλη που βρίσκεται ο σταθμός</option>
                            }
                            {greekCapitalCities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Ενεργός</label>
                        <select name='is_active' value={props.is_active} onChange={props.onChangeValue} className="form-control">
                            {props.is_active === '' &&
                            <option value=''>Επιλέξτε απο τα παρακάτω</option>
                            }
                            <option value='1'>Ναι</option>
                            <option value='0'>Οχι</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Προβολή</label>
                        <select name='privacy' value={props.privacy} onChange={props.onChangeValue} className="form-control">
                            {props.privacy === '' &&
                            <option value=''>Επιλέξτε απο τα παρακάτω</option>
                            }
                            <option value='public'>Δημόσιος</option>
                            <option value='private'>Ιδιωτικός</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col-xl-10 offset-xl-1">
                    <div className="form-group">
                        <label>Περιγραφή (Προαιρετικά)</label>
                        <textarea name='description' value={props.description} onChange={props.onChangeValue} className="form-control" placeholder="Συμπληρώστε κάποια στοιχεία που θέλετε να αναφέρετε για τον σταθμό..." autoComplete='off'/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="update ml-auto mr-auto">
                    <button className="btn btn-primary btn-round">{props.lastName ? 'Ενημέρωση' : 'Δημιουργία' }</button>
                </div>
            </div>
        </div>
    </div>
);

export default StationCreateOrEditFormDetails

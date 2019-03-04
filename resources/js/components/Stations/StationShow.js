import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import {greekCapitalCities} from "../../general_functions/cities";
import {CardBelowHeaderTitle, CardHeaderTitle} from "../../containers/generalContainers";

let StationShow = ({station, users, categories}) => !!station ? (
            <div className="content">
                <div className='pb-3'>
                    <CardHeaderTitle name='Σταθμοί'/>
                </div>
                <div className="row">
                    <div className="col-sm-6 animated fadeIn faster">
                        <div className="card">
                            <CardBelowHeaderTitle name={`Προβολή σταθμού: ${station.name}`}/><hr/>
                            <div className="card-body">
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Όνομα</label>
                                            <input type="text" defaultValue={station.name} className="form-control" disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Μοναδικός κωδικός</label>
                                            <input type="text" defaultValue={station.unique} className="form-control" disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Ιδιοκτησία</label>
                                            <select defaultValue={station.user_id} className="form-control" disabled>
                                                <option defaultValue={station.user_id}>{users.find(user => user.id === station.user_id).email}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Τοποθεσία (Πόλη)</label>
                                            <select defaultValue={station.location} className="form-control" disabled>
                                                <option defaultValue={station.location}>{greekCapitalCities.find(city => city === station.location)}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Ενεργός</label>
                                            <select defaultValue={station.is_active} className="form-control" disabled>
                                                <option defaultValue={station.is_active}>{station.is_active ? 'Ναι' : 'Οχι'}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Προβολή</label>
                                            <select defaultValue={station.privacy} className="form-control" disabled>
                                                <option defaultValue={station.privacy}>{station.privacy === 'public' ? 'Ιδιωτικός' : 'Δημόσιος' }</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col-xl-10 offset-xl-1">
                                        <div className="form-group">
                                            <label>Περιγραφή (Προαιρετικά)</label>
                                            <textarea defaultValue={station.description ? station.description : 'Δεν έχει δωθεί περιγραφή'} className="form-control" disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card animated fadeIn fast">
                            <CardBelowHeaderTitle name='Λίστα κατηγοριών'/>
                            <hr/>
                            <div className="card-body">
                                {!!categories.length ?
                                    <div className="row mb-1">
                                        {categories.map(category => (
                                            <div key={category.id} className="col-5 offset-1  col-md-3 offset-md-1">
                                                <div className="form-group">
                                                    <label className="checkbox">
                                                        <input type="checkbox"
                                                               defaultChecked={!!station.categories.length &&
                                                               station.categories.find(cat=>cat.id === category.id)}
                                                               data-toggle="checkbox"
                                                               disabled
                                                        /> {category.name}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <h3 className='text-danger text-center mt-0'>Δεν υπάρχουν κατηγορίες</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <Redirect to='/stations/all'/>;


const mapStateToProps = (state, props) => {
    let station = state.stations.find(station => station.name === props.match.params.name);
    if(!station || (!!station && station.user_id === state.user.id)) station = undefined;
    return {
        station,
        users: state.users,
        categories: state.categories
    }
};

export default connect(mapStateToProps)(StationShow)
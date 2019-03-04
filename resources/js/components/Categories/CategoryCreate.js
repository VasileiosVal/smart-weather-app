import React from 'react';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let CategoryCreate = ({name, symbol, minValue, maxValue, onChangeValue, onSubmitCategory}) => (
            <div className="card animated fadeIn faster">
                <CardBelowHeaderTitle name='Δημιουργία κατηγορίας'/>
                <hr/>
                <div className="card-body text-center">
                        <form id='formData' onSubmit={onSubmitCategory}>
                            <div className="form-group">
                                <label>Όνομα</label>
                                <input type='text' name='name' value={name} onChange={onChangeValue} placeholder='Όνομα κατηγορίας' className='form-control' autoComplete='off'/>
                            </div>
                            <div className="form-group">
                                <label>Σύμβολο</label>
                                <input type='text' name='symbol' value={symbol} onChange={onChangeValue} placeholder='Σύμβολο' className='form-control' autoComplete='off'/>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Ελάχιστη τιμή</label>
                                        <input type='number' name='minValue' step="0.1" min="-1000.0" max="10000.0" value={minValue} onChange={onChangeValue} placeholder='Ελάχιστη τιμή...' className='form-control' autoComplete='off'/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Μέγιστη τιμή</label>
                                        <input type='number' name='maxValue' step="0.1" min="-1000.0" max="10000.0" value={maxValue} onChange={onChangeValue} placeholder='Μέγιστη τιμή...' className='form-control' autoComplete='off'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <p><label>*Υποσημείωση: Στο πεδίο Όνομα δεν είναι αποδεκτοί οι ελληνικοί χαρακτήρες.</label></p>
                                <button className=" btn btn-primary btn-round">Δημιουργία</button>
                            </div>
                        </form>
                </div>
            </div>
    );

export default CategoryCreate


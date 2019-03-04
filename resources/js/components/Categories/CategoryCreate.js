import React from 'react';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let CategoryCreate = ({name, symbol, onChangeValue, onSubmitCategory}) => (
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
                            <div className="form-group">
                                <p><label>*Υποσημείωση: Στο πεδίο Όνομα δεν είναι αποδεκτοί οι ελληνικοί χαρακτήρες.</label></p>
                                <button className=" btn btn-primary btn-round">Δημιουργία</button>
                            </div>
                        </form>
                </div>
            </div>
    );

export default CategoryCreate


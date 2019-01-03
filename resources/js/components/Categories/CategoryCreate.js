import React from 'react';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let CategoryCreate = ({submitCategory, clearAllInputsAndSetIncomingData}) => (
            <div className="card">
                <CardBelowHeaderTitle name='Δημιουργία κατηγορίας'/>
                <hr/>
                <div className="card-body text-center">
                        <form id='formData' onSubmit={submitCategory}>
                            <div className="form-group">
                            <label>Όνομα</label>
                            <input onChange={()=>{clearAllInputsAndSetIncomingData(false)}} type='text' name='name' placeholder='Όνομα κατηγορίας' className='form-control' autoComplete='off'/>
                            </div>
                            <div className="form-group">
                            <label>Σύμβολο</label>
                            <input onChange={()=>{clearAllInputsAndSetIncomingData(false)}} type='text' name='symbol' placeholder='Σύμβολο' className='form-control' autoComplete='off'/>
                            </div>
                            <div className="form-group">
                            <button className=" btn btn-primary btn-round">Δημιουργία</button>
                            </div>
                        </form>
                </div>
            </div>
    );

export default CategoryCreate


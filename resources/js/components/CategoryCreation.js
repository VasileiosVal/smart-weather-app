import React from 'react';

export const CategoryCreation = ({submitCategory, clearAllInputsAndSetIncomingData}) => {
    return (
        <div className="col-sm-4">
            <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">Δημιουργία κατηγορίας</h4>
                </div>
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
        </div>
    );
};


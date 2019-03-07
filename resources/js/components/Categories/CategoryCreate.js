import React from 'react';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let CategoryCreate = ({name, symbol, minValue, maxValue, onChangeValue, onSubmitCategory}) => (
            <div className="card animated fadeIn faster">
                <CardBelowHeaderTitle name='Category creation'/>
                <hr/>
                <div className="card-body text-center">
                        <form id='formData' onSubmit={onSubmitCategory}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type='text' name='name' value={name} onChange={onChangeValue} placeholder='category name..' className='form-control' autoComplete='off'/>
                            </div>
                            <div className="form-group">
                                <label>Symbol</label>
                                <input type='text' name='symbol' value={symbol} onChange={onChangeValue} placeholder='category symbol..' className='form-control' autoComplete='off'/>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Min value</label>
                                        <input type='number' name='minValue' step="0.1" min="-1000.0" max="10000.0" value={minValue} onChange={onChangeValue} placeholder='category min value..' className='form-control' autoComplete='off'/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Max value</label>
                                        <input type='number' name='maxValue' step="0.1" min="-1000.0" max="10000.0" value={maxValue} onChange={onChangeValue} placeholder='category max value..' className='form-control' autoComplete='off'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <p><label>*Note: In the Name field, only English characters are accepted.</label></p>
                                <button className=" btn btn-primary btn-round">Create</button>
                            </div>
                        </form>
                </div>
            </div>
    );

export default CategoryCreate


import React from 'react';

let StationCreateCategoriesList = ({categories, checkedCategories, changeCategories}) => {
        return(
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                        <h4 className="text-center">Λίστα κατηγοριών</h4>
                    </div>
                    <hr/>
                    <div className="card-body">
                        {categories.length > 0 ?
                                <div className="row mb-1">
                                    {categories.map((category)=>{
                                        return  <div key={category.id} className="col-5 offset-1  col-md-3 offset-md-1">
                                                    <div className="form-group">
                                                        <label className="checkbox">
                                                            <input type="checkbox"
                                                                   name='checkbox'
                                                                   checked={checkedCategories.length > 0 &&
                                                                   checkedCategories.indexOf(category.id) > -1}
                                                                   value={category.id}
                                                                   onChange={changeCategories}
                                                                   data-toggle="checkbox"
                                                            /> {category.name}
                                                        </label>
                                                    </div>
                                                </div>
                                    })}

                                </div>
                            :
                            <h3 className='text-danger text-center mt-0'>Δεν υπάρχουν κατηγορίες</h3>
                        }
                    </div>
                </div>
            </div>
        );
}


export default StationCreateCategoriesList
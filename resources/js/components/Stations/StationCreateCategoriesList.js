import React from 'react';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

let StationCreateCategoriesList = ({allCategories, checkedCategories, onClickChangeCategoryList}) => (
    <div className="card">
       <CardBelowHeaderTitle name='Λίστα κατηγοριών'/><hr/>
        <div className="card-body">
            {allCategories.length ?
                <div className="row mb-1">
                    {allCategories.map(category=> (
                        <div key={category.id} className="col-5 offset-1 col-md-3 offset-md-1">
                            <div className="form-group">
                                <label className="checkbox">
                                    <input type="checkbox"
                                           checked={checkedCategories.length &&
                                           checkedCategories.indexOf(category.id) > -1}
                                           value={category.id}
                                           onChange={onClickChangeCategoryList}
                                           data-toggle="checkbox"
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
);


export default StationCreateCategoriesList
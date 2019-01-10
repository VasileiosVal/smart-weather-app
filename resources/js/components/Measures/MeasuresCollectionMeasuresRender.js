import React from 'react';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";
import {MiniLoader} from "../General/MiniLoader";
import {findCategory} from "../../general_functions/generalFunctions";

let MeasuresCollectionMeasuresRender = ({initMeasuresLoader, showMeasures, collectionMeasures, showCollectionHash, categories}) => (
    <div className="card">
        <CardBelowHeaderTitle name={showMeasures && collectionMeasures.length ? `Μετρήσεις συλλογής ${showCollectionHash.substr(0, 7)}...` : 'Μετρήσεις'}/><hr/>
        <div className="card-body">
            {initMeasuresLoader ?
                <MiniLoader/>
            :
                showMeasures &&
                (
                    collectionMeasures.length ?
                        <div className='row'>
                            {collectionMeasures.map(measure => (
                                <div key={measure.cat_id} className="col-lg-4 col-6">
                                    <div className="card card-stats bg-light">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-4 col-md-3">
                                                    <div className="icon-big">
                                                        <i className="fa fa-list-alt"/>
                                                    </div>
                                                </div>
                                                <div className="col-8 col-md-9">
                                                    <div className="numbers">
                                                        <p className="card-category">{findCategory(measure.cat_id, categories).name}</p>
                                                        <p className="card-values">{measure.value}&nbsp;{findCategory(measure.cat_id, categories).symbol}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer"><hr/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    :
                        <h5 className='text-danger text-center mt-0'>Δεν υπάρχουν μετρήσεις στην συγκεκριμένη σειρά.</h5>
                )
            }
        </div>
    </div>
);

export default MeasuresCollectionMeasuresRender
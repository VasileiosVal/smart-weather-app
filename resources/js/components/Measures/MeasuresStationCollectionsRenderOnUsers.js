import React from 'react';
import moment from "moment/moment";
import {Scrollbars} from "react-custom-scrollbars";
import DatePicker from "react-datepicker";
import {CardHeaderTitleMeasures, NoSearchResults, TooltipInfo, WaitingLoader} from "../../containers/generalContainers";
import {findCategory} from "../../general_functions/generalFunctions";


let MeasuresStationCollectionsRenderOnUsers = props => {

    //***** DESTRUCT
    let {selectedStationCollections,
        filteredSelectedStationCollections,
        collectionsWithMeasures,
        initCollectionsLoader,
        showCollections,
        startDate,
        onClickChangeDateStart,
        endDate,
        onClickChangeDateEnd,
        onClickRenderMeasures,
        onClickDeleteCollectionModal,
        categories,
        myCollections} = props;

    return (
        <div className="card card animated fadeIn slow">
        <CardHeaderTitleMeasures title='Συλλογές μετρήσεων' label='Επιλέξτε συλλογή μετρήσεων για να εμφανιστούν οι μετρήσεις'/>
        <div className="card-body py-0">
            {initCollectionsLoader ?
                <WaitingLoader/>
                :
                showCollections ?
                    selectedStationCollections.length ?
                        <React.Fragment>
                            <div className="row align-items-center my-1">
                                <div className="offset-md-1 col-md-5">
                                    <DatePicker
                                        placeholderText="Από..."
                                        className='form-control my-0 py-0'
                                        selected={startDate}
                                        selectsStart
                                        minDate={moment().year(-2)}
                                        maxDate={moment()}
                                        startDate={startDate}
                                        endDate={endDate}
                                        isClearable={true}
                                        onChange={onClickChangeDateStart}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <DatePicker
                                        placeholderText="Έως..."
                                        className='form-control my-0 py-0'
                                        selected={endDate}
                                        selectsEnd
                                        minDate={moment().year(-2)}
                                        maxDate={moment()}
                                        startDate={startDate}
                                        endDate={endDate}
                                        isClearable={true}
                                        onChange={onClickChangeDateEnd}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <TooltipInfo id='collections' text='Συμπληρώνοντας τα πεδία, επιλέγετε την προβολή συλλογών, που βρίσκονται μεταξύ του χρονικού διαστήματος που έχετε δηλώσει.'/>
                                </div>
                            </div>
                            <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={300}>
                                <React.Fragment>
                                    {filteredSelectedStationCollections.length ?
                                        filteredSelectedStationCollections.map(collection => (
                                            <div key={collection.id} className="make-border position-relative point">
                                                <div onClick={()=>onClickRenderMeasures(collection.id)}>
                                                    <p className='text-right py-0 mb-2'><small>Ημ. καταγραφής: {moment(collection.created_at).format('ddd D MMM YY, h:mm:ss a')}</small></p>
                                                    <div>
                                                        <h6>Μετρήσεις για:
                                                            {collectionsWithMeasures.find(data => data.col_id === collection.id) &&
                                                            collectionsWithMeasures.find(data => data.col_id === collection.id).measures
                                                                .map(measure => <span key={measure.cat_id} className="badge badge-warning ml-1">&nbsp;{findCategory(measure.cat_id, categories).name}</span>)
                                                            }
                                                        </h6>
                                                        <p className='py-0 mb-0'>Κωδικός σειράς μετρήσεων: <label>{collection.series_hash}</label></p>
                                                    </div>
                                                </div>
                                                {myCollections.find(myCollection => myCollection.id === collection.id) &&
                                                    <span className='text-right absolute'>
                                                            <i title='Διαγραφή'
                                                               onClick={() => onClickDeleteCollectionModal(collection.series_hash)}
                                                               className='text-red fas fa-trash-alt point'/>
                                                    </span>
                                                }
                                            </div>
                                        ))
                                        :
                                        <NoSearchResults/>
                                    }
                                </React.Fragment>
                            </Scrollbars>
                        </React.Fragment>
                    :
                        <h6 className='text-danger text-center py-2'>Δεν υπάρχουν σειρές μετρήσεων στον σταθμό</h6>
                :
                    <h6 className='text-danger text-center py-2'>Δεν έχει επιλεγεί σταθμός</h6>
            }
        </div>
    </div>
    );
};

export default MeasuresStationCollectionsRenderOnUsers
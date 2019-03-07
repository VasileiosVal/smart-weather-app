import React from 'react';
import moment from "moment/moment";
import {Scrollbars} from "react-custom-scrollbars";
import {CardHeaderTitleMeasures, NoSearchResults, SearchBar, TooltipInfo} from "../../containers/generalContainers";
import {findCollectionsFromStation} from "../../general_functions/generalFunctions";


let MeasuresStationsRender = ({sortBy, searchQuery, onChangeFilters, filteredStationsWithCollections, collections, onClickRenderCollections}) => (
    <div className="card animated fadeIn fast">
        <CardHeaderTitleMeasures title='Stations' label='Select a station from the list to display its measurements collections'/>
        <div className="card-body py-0">
            <div className="row align-items-center my-1">
                <div className="col-lg-4 mx-0">
                    <div className="my-0 py-0">
                        <select name='sortBy' value={sortBy} onChange={onChangeFilters} className='form-control'>
                            <option value="all">All</option>
                            <option value="own">My stations</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="most">Most collections</option>
                        </select>

                    </div>
                </div>
                <div className="col-lg-7 mx-0">
                    <div className="input-group my-0 py-0">
                        <SearchBar
                            name='searchQuery'
                            value={searchQuery}
                            handler={onChangeFilters}
                            placeHolder='Station search...'
                        />
                    </div>
                </div>
                <div className="col-lg-1">
                    <TooltipInfo
                        id='stations'
                        text='In the fields there are options for sorting and searching stations.'
                        place='left'
                    />
                </div>
            </div>
            <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={300}>
                <React.Fragment>
                    {!!filteredStationsWithCollections.length ?
                        filteredStationsWithCollections.map(station => (
                            <div key={station.id} onClick={() => onClickRenderCollections(station.id)} className="make-border point">
                                <div className="d-flex justify-content-between">
                                    <h5>
                                        {station.is_active ?
                                            <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                        :
                                            <i className="mr-2 text-danger fas fa-broadcast-tower"/>
                                        }
                                        {station.name}&nbsp;
                                        <span className="badge badge-warning badge-pill">{findCollectionsFromStation(station, collections).length}</span>
                                    </h5>
                                    <small>Creation date: {moment(station.created_at).format('ddd D MMM YY')}</small>
                                </div>
                                <p className='mb-1'>Station information:
                                    {station.is_active ?
                                        <span className='text-success station mx-1'>Active</span>
                                        :
                                        <span className='text-danger station mx-1'>Inactive</span>
                                    }
                                    {station.privacy === 'public' ?
                                        <span className='text-primary station mx-1'>Public</span>
                                        :
                                        <span className='text-primary station mx-1'>Private</span>
                                    }
                                </p>
                            </div>
                        ))
                    :
                        <NoSearchResults/>
                    }
                </React.Fragment>
            </Scrollbars>
        </div>
    </div>
);

export default MeasuresStationsRender
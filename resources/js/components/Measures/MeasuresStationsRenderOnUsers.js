import React from 'react';
import moment from "moment/moment";
import {CardHeaderTitleMeasures, NoSearchResults, SearchBar, TooltipInfo} from "../../containers/generalContainers";
import {Scrollbars} from "react-custom-scrollbars";
import {figureIfAndReturnMyStation} from "../../general_functions/generalFunctions";

let MeasuresStationsRenderOnUsers = props => {

    let {sortBy,
        searchQuery,
        onChangeFilters,
        filteredStationsWithCollections,
        myStationsWithCollections,
        onClickRenderCollections} = props;

    return (
        <div className="card animated fadeIn fast">
            <CardHeaderTitleMeasures title='Σταθμοί' label='Επιλέξτε σταθμό απο την λίστα για να εμφανιστούν οι συλλογές μετρήσεων του'/>
            <div className="card-body py-0">
                <div className="row align-items-center my-1">
                    <div className="col-lg-4 mx-0">
                        <div className="my-0 py-0">
                            <select name='sortBy' value={sortBy} onChange={onChangeFilters} className='form-control'>
                                <option value="all">Όλοι</option>
                                <option value="own">Οι σταθμοί μου</option>
                                <option value="active">Ενεργοί</option>
                                <option value="inactive">Ανενεργοί</option>
                                <option value="most">Περισσότερες συλλογές</option>
                            </select>

                        </div>
                    </div>
                    <div className="col-lg-7 mx-0">
                        <div className="input-group my-0 py-0">
                            <SearchBar
                                name='searchQuery'
                                value={searchQuery}
                                handler={onChangeFilters}
                                placeHolder='Αναζητήστε τον σταθμό...'
                            />
                        </div>
                    </div>
                    <div className="col-lg-1">
                        <TooltipInfo id='stations' text='Στα πεδία υπάρχουν οι επιλογές για ταξινόμηση και αναζήτηση σταθμών.'/>
                    </div>
                </div>
                <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={300}>
                    <React.Fragment>
                        {filteredStationsWithCollections.length ?
                            filteredStationsWithCollections.map(station => (
                                <div key={station.id} onClick={() => onClickRenderCollections(station.id)} className="make-border point">
                                    <div className="d-flex justify-content-between">
                                        <h5>
                                            {figureIfAndReturnMyStation(myStationsWithCollections, station) ?
                                                figureIfAndReturnMyStation(myStationsWithCollections, station).is_active ?
                                                    <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                :
                                                    <i className="mr-2 text-danger fas fa-broadcast-tower"/>
                                            :
                                                <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                            }
                                            {figureIfAndReturnMyStation(myStationsWithCollections, station) ?
                                                figureIfAndReturnMyStation(myStationsWithCollections, station).name
                                                :
                                                station.name
                                            }
                                            &nbsp;<span className="badge badge-warning badge-pill">{station.collections.length}</span>
                                        </h5>
                                        {figureIfAndReturnMyStation(myStationsWithCollections, station) ?
                                            <small>Ημ. δημιουργιας: {moment(figureIfAndReturnMyStation(myStationsWithCollections, station).created_at).format('ddd D MMM YY')}</small>
                                        :
                                            <i className="text-red fas fa-user-secret" title='Πληροφορία μη προσβάσιμη'/>
                                        }
                                    </div>
                                    <p className='mb-1'>Στοιχεία σταθμού:
                                        {figureIfAndReturnMyStation(myStationsWithCollections, station) ?
                                            <React.Fragment>
                                                {figureIfAndReturnMyStation(myStationsWithCollections, station).is_active ?
                                                    <span className='text-success station mx-1'>Ενεργός</span>
                                                    :
                                                    <span className='text-danger station mx-1'>Ανενεργός</span>
                                                }
                                                {figureIfAndReturnMyStation(myStationsWithCollections, station).privacy === 'public' ?
                                                    <span className='text-primary station mx-1'>Δημόσιος</span>
                                                    :
                                                    <span className='text-primary station mx-1'>Ιδιωτικός</span>
                                                }
                                            </React.Fragment>
                                        :
                                            <React.Fragment>
                                                <span className='text-success station mx-1'>Ενεργός</span>
                                                <span className='text-primary station mx-1'>Δημόσιος</span>
                                            </React.Fragment>
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
    )
};

export default MeasuresStationsRenderOnUsers
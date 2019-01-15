import React from 'react';
import DatePicker from "react-datepicker";
import {
    CardHeaderTitleMeasures, LineChart, TooltipInfo,
    WaitingLoader
} from "../../containers/generalContainers";
import {findCategory} from "../../general_functions/generalFunctions";
import moment from "moment/moment";

let GraphAllStationsMeasuresSpecificCategory = props => {
    let {initStationsWithMeasuresLoader,
        showStationsWithMeasuresPerCategory,
        stationsWithMeasuresPerCategory,
        filteredStationsWithMeasuresPerCategory,
        selectedCategory,
        stationsWithCollections,
        categories,
        startDate,
        endDate,
        onClickChangeDateStart,
        onClickChangeDateEnd} = props;

    return (
        <div className="card animated fadeIn delay-1.1s">
            <CardHeaderTitleMeasures
                title={stationsWithMeasuresPerCategory.length && selectedCategory ?
                    `Γράφημα μετρήσεων σταθμών για κατηγορία: ${findCategory(selectedCategory, categories).name} (${findCategory(selectedCategory, categories).symbol})` :
                    'Γράφημα μετρήσεων σταθμών ανά κατηγορία'
                }
            />
            <div className="card-body py-0">
                {initStationsWithMeasuresLoader ?
                    <WaitingLoader text={false}/>
                :
                    showStationsWithMeasuresPerCategory ?
                        stationsWithMeasuresPerCategory.length ?
                            <div>
                                <div className="row align-items-center justify-content-center mt-2">
                                    <div className='mx-1'>
                                        <DatePicker
                                            placeholderText="Από..."
                                            className='form-control'
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
                                    <div className='mx-2'>
                                        <DatePicker
                                            placeholderText="Έως..."
                                            className='form-control'
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
                                    <div>
                                        <TooltipInfo id='datepick' text='Συμπληρώνοντας τα πεδία, επιλέγετε την προβολή συλλογών, που βρίσκονται μεταξύ του χρονικού διαστήματος που έχετε δηλώσει.'/>
                                    </div>
                                </div>
                                <hr className='style mt-2'/>
                                <div className="card-body position-relative">
                                    {selectedCategory && findCategory(selectedCategory, categories).name === 'rain' &&
                                        <TooltipInfo
                                            id='rain'
                                            giveClass='tooltip-rain-absolute'
                                            label='Υπάρχουν 3 πιθανές τιμές για την συγκεκριμένη κατηγορία: 0, 1, 2'
                                            text='0: Όχι βροχή  -  1: Αίσθηση πιθανής βροχής(ψιχάλα, υγρασία)  -  2: Βροχή'
                                        />
                                    }
                                    <LineChart
                                        filteredStationsWithMeasuresPerCategory={filteredStationsWithMeasuresPerCategory}
                                        stationsWithCollections={stationsWithCollections}
                                        height={360}
                                    />
                                </div>
                            </div>
                        :
                            <h6 className='text-danger text-center py-2'>Δεν υπάρχουν σειρές μετρήσεων στον σταθμό</h6>
                    :
                        <h6 className='text-danger text-center py-2'>Δεν έχει επιλεγεί κατηγορία</h6>
                }
            </div>
        </div>
    );
}

export default GraphAllStationsMeasuresSpecificCategory


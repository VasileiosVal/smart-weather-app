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
                    `Station measurements chart for category: ${findCategory(selectedCategory, categories).name} (${findCategory(selectedCategory, categories).symbol})` :
                    'Station measurements chart by category\n'
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
                                            placeholderText="From..."
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
                                            placeholderText="To..."
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
                                        <TooltipInfo id='datepick' text='By filling in the fields, you select the collections view, located between the time period you have specified.'/>
                                    </div>
                                </div>
                                <hr className='style mt-2'/>
                                <div className="card-body position-relative">
                                    {selectedCategory && findCategory(selectedCategory, categories).name === 'rain' &&
                                        <TooltipInfo
                                            id='rain'
                                            giveClass='tooltip-rain-absolute'
                                            label='There are 3 possible values ​​for this category: 0, 1, 2'
                                            text='0: Rain  -  1: Feeling of possible rain (brittle, damp)  -  2: No rain'
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
                            <h6 className='text-danger text-center py-2'>There are no measurements collections for this station</h6>
                    :
                        <h6 className='text-danger text-center py-2'>No category selected</h6>
                }
            </div>
        </div>
    );
}

export default GraphAllStationsMeasuresSpecificCategory


import React from 'react';
import Slider from "react-slick";
import {
    findCategory, findStationAndIfExistsAndReturnName,
    loadSliderSettings
} from "../../general_functions/generalFunctions";
import moment from "moment/moment";
import {BarChart, TooltipInfo} from "../../containers/generalContainers";

let GraphMinMax = ({minMaxMeasuresPerCategory, categories, stationsWithCollections}) => (
        <div className="card animated fadeIn delay-0.5s">
            <Slider {...loadSliderSettings}>
                {minMaxMeasuresPerCategory.map(measure => (
                    <div key={measure.category_id} className='position-relative'>
                        <TooltipInfo
                            id='before'
                            label={`Τιμή: ${measure.min.value}`}
                            text={`Μέτρηση στις: ${moment.unix(measure.min.created_at_tmstp).format('D MMM YY, h:mm:ss a')}`}
                            giveClass='slider-info-left'
                            place='top'
                        />
                        <div className="card-body">
                            <BarChart
                                title='Μέγιστες/Ελάχιστες καταγεγραμένες τιμές ανά κατηγορία'
                                legend={`${findCategory(measure.category_id, categories).name} (${findCategory(measure.category_id, categories).symbol})`}
                                labelNames={[
                                    `Σταθμός: ${findStationAndIfExistsAndReturnName(measure.min.station_id, stationsWithCollections)}`,
                                    `Σταθμός: ${findStationAndIfExistsAndReturnName(measure.max.station_id, stationsWithCollections)}`]}
                                labelValues={[measure.min.value, measure.max.value]}
                                height={170}
                                tooltipEnabled={false}
                            />
                        </div>
                        <TooltipInfo
                            id='after'
                            label={`Τιμή: ${measure.max.value}`}
                            text={`Μέτρηση στις: ${moment.unix(measure.max.created_at_tmstp).format('D MMM YY, h:mm:ss a')}`}
                            giveClass='slider-info-right'
                            place='top'
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );

export default GraphMinMax
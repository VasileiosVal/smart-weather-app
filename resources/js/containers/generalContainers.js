import React from 'react';
import ReactTooltip from 'react-tooltip';
import {Bar, Doughnut} from "react-chartjs-2";
import {Line} from 'react-chartjs-2';
import moment from "moment/moment";
import {MiniLoader} from "../components/General/MiniLoader";
import {
    findIfStationHasCollections, findIfUserIsAdmin,
    findStationAndIfExistsAndReturnName
} from "../general_functions/generalFunctions";


export let CardHeaderTitle = ({name=''}) => (
    <div className='pb-3'>
        <h5 className="card-title text-center">{name}</h5>
    </div>
);

export let CardBelowHeaderTitle = ({name='', font=''}) => (
    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
        <h4 className="text-center">{font!=='' && font}  {name}</h4>
    </div>
);

export let CardHeaderTitleMeasures = ({title='', label=''}) => (
    <React.Fragment>
    <h5 className="card-header d-flex flex-row align-items-center justify-content-center py-0 my-2">{title}</h5>
    <p className='text-center py-0 my-0'><label>{label}</label></p>
    <hr className='style my-0'/>
    </React.Fragment>
);

export let NoMeasuresMessage = ({header=''}) => (
    <React.Fragment>
        <h5 className="card-title text-center">{header}</h5><hr/>
        <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν μετρήσεις</h4>
    </React.Fragment>
);

export let Image = ({src='', style=''}) => (
    <img src={src} className={style} alt=""/>
);

export let NoSearchResults = () => (
    <div className='d-flex flex-row justify-content-center'>
        <p className='card-category mt-3'><i className='fas fa-search'/>&nbsp;Δεν βρέθηκαν αποτελέσματα απο την αναζήτηση</p>
    </div>
);

export let TooltipInfo = ({id='global', label=false, text='', giveClass='', place='right'}) => (
    <React.Fragment>
        <i className={`fas fa-info-circle ${!!giveClass && giveClass}`} data-tip data-for={id}/>
        <ReactTooltip id={id} place={place} type="dark" effect="float">
            {label && <p className='text-center'>{label}</p>}
            <p>{text}</p>
        </ReactTooltip>
    </React.Fragment>
);

export let WaitingLoader = ({text=true}) => (
    <div>
        {text && <h5 className='text-center'>Παρακαλώ περιμένετε...</h5>}
        <MiniLoader/>
    </div>
);

export let SearchBar  = ({name='', value='', handler, placeHolder=''}) => (
    <React.Fragment>
        <input type="text" name={name} value={value} onChange={handler} className="form-control" placeholder={placeHolder}/>
        <div className="input-group-append">
            <span className="input-group-text bg-light text-info"><i className="fas fa-search ml-2"/></span>
        </div>
    </React.Fragment>
);

//************CHARTS*************

//*****CREATING DATA FOR CHART BAR
let createBarData = (legend, labelNames, labelValues) => ({
    labels: labelNames,
    datasets: [
        {
            label: legend,
            backgroundColor: 'rgba(41, 125, 226, 0.55)',
            borderColor: 'rgba(41, 125, 226, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(41, 125, 226, 0.70)',
            hoverBorderColor: 'rgba(41, 125, 226, 1)',
            data: labelValues
        }
    ]
});

//****** BAR CHART
export let BarChart = ({title='', legend='', labelNames=[], labelValues=[], width=100, height=100, tooltipEnabled=true}) => {
    let data = createBarData(legend, labelNames, labelValues);
    return (
        <Bar
            data={data}
            width={width}
            height={height}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: true,
                    text: title
                },
                tooltips: {
                    enabled: tooltipEnabled
                }
            }}
        />
    )
};


//*****CREATING DATA FOR LINE CHART
let createLineDataSets = (filteredStationsWithMeasuresPerCategory, stationsWithCollections) => {
    return filteredStationsWithMeasuresPerCategory.map(data => {

        let randomColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`;

        let measures = data.measures.map(measure => ({
            x: moment.unix(measure.created_at_tmstp),
            y: measure.value
        }));
        return {
            label: findStationAndIfExistsAndReturnName(data.station_id, stationsWithCollections),
            fill: false,
            backgroundColor: randomColor,  //stations
            pointBorderColor: randomColor,
            data: measures
        }
    })
};


//****** LINE CHART
export let LineChart = ({filteredStationsWithMeasuresPerCategory, stationsWithCollections, height=350}) => {

    let datasets = createLineDataSets(filteredStationsWithMeasuresPerCategory, stationsWithCollections);
    let data = {datasets};

    return (
        <Line
            data={data}
            options={{
                maintainAspectRatio: false,
                responsive: true,
                showLines: false,
                elements: {
                    point: {
                        pointStyle: 'circle',
                        borderWidth: 9,
                        HoverRadius: 2,
                    }
                },
                title: {
                    display: true,
                    text: 'Σταθμοί'
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                hour: 'D MMM',
                                day: 'D MMM YY'
                            }
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Χρόνος',
                            fontColor: 'rgba(147,0,19,1)',
                            fontSize: 16
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'τιμές',
                            fontColor: 'rgba(147,0,19,1)',
                            fontSize: 16
                        }
                    }]
                }
            }}
            height={height}
        />
    )
};


//*****CREATING DATA FOR STATIONS DONUT CHART
let createDonutStationsDataSets = (adminStations, userStations, activeStations, inactiveStations, publicStations, privateStations, stationsWithCollections) => {
    let colors = [
        '#ccc200',
        '#d8a1de',
        '#00a126',
        '#dd0600',
        '#0096dd',
        '#912386',
        '#bf6f3c'
    ];
    return {
        labels: [
            'Ιδιοκτησία admin',
            'Ιδιοκτησία user',
            'Ενεργοί',
            'Ανενεργοί',
            'Δημόσιοι',
            'Ιδιωτικοί',
            'Έχουν μετρήσεις'
        ],
        datasets: [{
            data: [adminStations, userStations, activeStations, inactiveStations, publicStations, privateStations, stationsWithCollections],
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    }
};

//STATIONS DONUT CHART
export let DonutStationsChart = ({users, stations, collections, height=300}) => {
    let stationsWithAdminOwner = stations.filter(station => findIfUserIsAdmin(station.user_id, users)).length;
    let stationsWithUserOwner = stations.filter(station => !findIfUserIsAdmin(station.user_id, users)).length;
    let activeStations = stations.filter(station => station.is_active).length;
    let inactiveStations = stations.filter(station => !station.is_active).length;
    let publicStations = stations.filter(station => station.privacy === 'public').length;
    let privateStations = stations.filter(station => station.privacy === 'private').length;
    let stationsWithCollections = stations.filter(station => findIfStationHasCollections(station.id, collections)).length;

    let data=createDonutStationsDataSets(stationsWithAdminOwner, stationsWithUserOwner, activeStations, inactiveStations, publicStations, privateStations, stationsWithCollections);
    return (
        <Doughnut
            data={data}
            options={{maintainAspectRatio: false}}
            height={height}
        />
    )
};



//*****CREATING DATA FOR USERS DONUT CHART
let createDonutUsersDataSets = (admins, users, active, inactive, notConfirmed) => {
    let colors = [
        '#65ccc9',
        '#f1f56d',
        '#730625',
        '#601eff',
        '#341a1c'
    ];
    return {
        labels: [
            'Διαχειριστές',
            'Χρήστες',
            'Ενεργοί',
            'Ανενεργοί',
            'Μη επιβεβαιωμένοι'
        ],
        datasets: [{
            data: [admins, users, active, inactive, notConfirmed],
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
    }
};

//USERS DONUT CHART
export let DonutUsersChart = ({users, height=300}) => {
    let admins = users.filter(user => user.role_id === 1).length;
    let simpleUsers = users.filter(user => user.role_id === 2).length;
    let active = users.filter(user => user.is_active).length;
    let inactive = users.filter(user => !user.is_active).length;
    let notConfirmed = users.filter(user => !user.confirmed).length;

    let data = createDonutUsersDataSets(admins, simpleUsers, active, inactive, notConfirmed);
    return (
        <Doughnut
            data={data}
            options={{maintainAspectRatio: false}}
            height={height}
        />
    );
}










import React from 'react';
import ReactTooltip from 'react-tooltip';

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

export let NoMeasuresMessage = () => (
    <React.Fragment>
        <h5 className="card-title text-center">Μετρήσεις</h5><hr/>
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

export let TooltipInfo = ({id='global', text=''}) => (
    <React.Fragment>
        <i className="fas fa-info-circle" data-tip data-for={id}/>
        <ReactTooltip id={id} place="right" type="dark" effect="float">
            <p>{text}</p>
        </ReactTooltip>
    </React.Fragment>
);





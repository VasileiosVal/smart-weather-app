import React from 'react';

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

export let Image = ({src='', style=''}) => (
    <img src={src} className={style} alt=""/>
);




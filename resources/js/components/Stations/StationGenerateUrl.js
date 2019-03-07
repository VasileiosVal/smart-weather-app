import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {CardBelowHeaderTitle} from "../../containers/generalContainers";
import {notifyTextCopiedToClipboard} from "../../general_functions/notifiers";
import {
    convertCategoryNamesToStr, findCategoryNameFromId,
    measuresInputUrl
} from "../../general_functions/generalFunctions";

let StationGenerateUrl = ({lastName, unique, is_active, checkedCategories, allCategories}) => {

    //***** FADE_IN CLASS
    let fadeInClass = `card animated fadeInRight ${!lastName ? 'delay-4s': 'delay-0.5s'}`;

    //***** FONTAWESOME LAMP
    let fontAwesomeLamp = <i className="text-warning fas fa-lightbulb"/>;

    let url = !!unique && !!checkedCategories.length && !!parseInt(is_active) &&
        measuresInputUrl(unique, convertCategoryNamesToStr(findCategoryNameFromId(checkedCategories, allCategories)));

    return (
        <div className={fadeInClass}>
            <CardBelowHeaderTitle font={fontAwesomeLamp} name='Information about shipping Url'/><hr/>
            {!!unique && !!checkedCategories.length ?
                !!parseInt(is_active) ?
                    <div className="card-body pt-0">
                        <p className='styled-text'>Below is the shipping url, according to
                            information you select for your station.
                            With this url your station can communicate with the system, send the
                            measurements it receives and appear here.
                        </p>
                        <h5 className='text-center'>Instructions</h5>
                        <p className='styled-text'>Tap the following url to copy, transfer it to your station and set it to
                            send to this url, with <strong>Post Request</strong>, the selected categories as follows :</p>
                        <CopyToClipboard
                            title='Copy link'
                            className='point url-generator'
                            text={url}
                            onCopy={() => notifyTextCopiedToClipboard()}>
                            <h6><i className="fas fa-arrow-right"/>&nbsp;{url}</h6>
                        </CopyToClipboard>
                        <p><label>*Note: At your station, replace the corresponding value in the "value" field .</label></p>
                        <p><i className=" text-danger fas fa-exclamation-circle"/>&nbsp;Caution! The unique code must be personal. Do not leave it exposed or transfer it to third parties.</p>
                    </div>
                :
                    <div>
                        <div className="card-body pt-0">
                            <p className='styled-text'><i className="fas fa-exclamation-triangle  text-danger"/>&nbsp;Select your station as active.
                                By selecting the station as inactive, no measurement received by the system will be stored.
                            </p>
                        </div>
                    </div>
            :
                <div className="card-body pt-0">
                    <p className='styled-text'>As you fill in the details and select a category, the shipping url will be created.</p>
                    <label className='text-left'>*Note: In the Unique code field, only English characters are accepted.</label>
                </div>
            }
        </div>
    );
};

export default StationGenerateUrl
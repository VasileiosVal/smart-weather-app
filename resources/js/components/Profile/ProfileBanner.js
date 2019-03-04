import React from 'react';
import {Image} from "../../containers/generalContainers";
import background from '../../../../public/images/background.jpg';
import person from '../../../../public/images/sample.jpeg';

let ProfileBanner = ({profile, stations, collections}) => (
        <div className="card card-user animated pulse delay-1s fast">
            <div className="image">
                <Image src={background} />
            </div>
            <div className="card-body">
                <div className="author">
                    <Image src={person} style='img-fluid avatar border-gray'/>
                    <h5 className="title mt-2 apply-blue">{profile.name} {profile.surname}</h5>
                    <p className="description">
                        {profile.email}
                    </p>
                </div>
            </div>
            <div className="card-footer">
                <hr/>
                <div className="button-container">
                    <div className="row">
                        <div className="col-6 ml-auto">
                            <h5>{stations.length}
                                <br/>
                                <small>Σταθμοί</small>
                            </h5>
                        </div>
                        <div className="col-6 ml-auto mr-auto">
                            <h5>{collections.length}
                                <br/>
                                <small>Συλλογές μετρήσεων</small>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

export default ProfileBanner
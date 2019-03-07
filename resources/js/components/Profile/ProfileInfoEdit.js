import React from 'react';
import ProfileEditDetails from "./ProfileEditDetails";
import ProfileEditPassword from "./ProfileEditPassword";

let ProfileInfoEdit = () => (
    <div className="row">
        <div className="col-4 col-lg-3">
            <div className="nav flex-column nav-pills bg-light" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="v-pills-info-tab" data-toggle="pill" href="#v-pills-info" role="tab" aria-controls="v-pills-info" aria-selected="true">User information</a>
                <a className="nav-link" id="v-pills-password-tab" data-toggle="pill" href="#v-pills-password" role="tab" aria-controls="v-pills-password" aria-selected="false">Password</a>

            </div>
        </div>
        <div className="col-8 col-lg-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-info" role="tabpanel" aria-labelledby="v-pills-info-tab">
                    <ProfileEditDetails/>
                </div>
                <div className="tab-pane fade" id="v-pills-password" role="tabpanel" aria-labelledby="v-pills-password-tab">
                    <ProfileEditPassword/>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileInfoEdit
import React from 'react';
import ProfileEditDetails from "./ProfileEditDetails";
import ProfileEditPassword from "./ProfileEditPassword";

let ProfileInfoEdit = () => (
    <div className="row">
        <div className="col-3">
            <div className="nav flex-column nav-pills bg-light" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Στοιχεία χρήστη</a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Κωδικός πρόσβασης</a>

            </div>
        </div>
        <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <ProfileEditDetails/>
                </div>
                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <ProfileEditPassword/>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileInfoEdit
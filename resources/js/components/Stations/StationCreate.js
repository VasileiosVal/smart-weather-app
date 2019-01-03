import React from 'react';
import {connect} from "react-redux";
import StationCreateOrEditAdmin from "./StationCreateOrEditAdmin";
import StationCreateOrEditUser from "./StationCreateOrEditUser";
import {CardHeaderTitle} from "../../containers/generalContainers";

let StationCreate = ({isAdmin}) => (
            <div className="content">
                <CardHeaderTitle name='Σταθμοί'/>
                {isAdmin ?
                    <StationCreateOrEditAdmin/>
                :
                    <StationCreateOrEditUser/>
                }
            </div>
        );

const mapStateToProps = state => ({
      isAdmin: state.user.role_id === 1
  });

export default connect(mapStateToProps)(StationCreate)
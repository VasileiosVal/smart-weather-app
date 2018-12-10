import React from 'react';
import {connect} from "react-redux";
import StationCreateOrEditAdmin from "./StationCreateOrEditAdmin";
import StationCreateOrEditUser from "./StationCreateOrEditUser";

class StationCreate extends React.Component {
    render(){
        return(
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Σταθμοί</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                </div>
                {this.props.isAdmin ?
                    <StationCreateOrEditAdmin/>
                    :
                    <StationCreateOrEditUser/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      isAdmin: state.user.role_id === 1
  }
};

export default connect(mapStateToProps)(StationCreate)
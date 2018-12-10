import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import StationCreateOrEditAdmin from "./StationCreateOrEditAdmin";
import StationCreateOrEditUser from "./StationCreateOrEditUser";



class StationEdit extends React.Component {
    render(){
        return this.props.station ? (
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Σταθμοί</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                </div>
                {this.props.isAdmin ?
                    <StationCreateOrEditAdmin station={this.props.station}/>
                    :
                    <StationCreateOrEditUser station={this.props.station}/>
                }
            </div>
        ) : (
            <Redirect to='/stations'/>
        )

    }
}

const mapStateToProps = (state, props) => {
    return {
        isAdmin: state.user.role_id === 1,
        station: state.stations.find((station)=>station.name === props.match.params.name && station.user_id === state.user.id)
    }
};

export default connect(mapStateToProps)(StationEdit)
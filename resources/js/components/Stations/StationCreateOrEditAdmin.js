import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import StationCreateCategoriesList from "./StationCreateCategoriesList";
import {
    notifyCreatedStation,
    notifyCreatedStationEmptyFields, notifyEditedStation, notifyGeneralStationCreateInfo, notifyNoChangesMade,
    notifyStationNameExists,
    notifyStationUniqueExists
} from "../../general_functions/notifiers";
import {startCreateStation, startEditStation} from "../../actions/Station";
import StationCreateOrEditFormDetails from "./StationCreateOrEditFormDetails";
import {regexFindGreek} from "../../general_functions/generalFunctions";
import StationGenerateUrl from "./StationGenerateUrl";


class StationCreateOrEditAdmin extends React.Component {
    state = this.props.station ?
        {
            name: this.props.station.name,
            unique: this.props.station.unique,
            user_id: this.props.station.user_id.toString(),
            location: this.props.station.location,
            is_active: this.props.station.is_active.toString(),
            privacy: this.props.station.privacy,
            description: this.props.station.description ? this.props.station.description : '',
            categories: this.props.station.categories.length ? this.props.station.categories.map(category => parseInt(category.id)) : [],
            lastName: this.props.station.name,
            lastUnique: this.props.station.unique
        }
        :
        {
            name: '',
            unique: '',
            user_id: '',
            location: '',
            is_active: '',
            privacy: '',
            description: '',
            categories: [],
            lastName: undefined,
            lastUnique: undefined
        };
    componentDidMount(){
        !this.state.lastName && notifyGeneralStationCreateInfo();
    }
    handleChangeValue = e => {
        if (e.target.name !== 'unique') {
            this.setState({[e.target.name]: e.target.value})
        } else {
            !regexFindGreek(e.target.value) && this.setState({[e.target.name]: e.target.value})
        }
    }
    handleChangeCategoryList = e => {
        let insertId = parseInt(e.target.value.trim());
        let checked = e.target.checked;
        this.setState(prev=>({categories: checked ?
                prev.categories.concat(insertId)
                :
                prev.categories.filter(id => id !== insertId)
        }))
    }
    handleSubmit = e => {
        e.preventDefault();
        let name = this.state.name.trim();
        let unique = this.state.unique.trim();
        let user_id = this.state.user_id.trim();
        let location = this.state.location.trim();
        let is_active = this.state.is_active.trim();
        let privacy = this.state.privacy.trim();
        let description = this.state.description;
        let categories = this.state.categories;
        let lastName = this.state.lastName;
        let lastUnique = this.state.lastUnique;

        if(!name || !unique || !user_id || !location || !is_active || !privacy){
            notifyCreatedStationEmptyFields();
        }else{
            description = !!description.trim() ? description.trim() : null;
            is_active = parseInt(is_active);
            user_id = parseInt(user_id);
            let foundStationWithName;
            let foundStationWithUnique;
            foundStationWithName = this.props.stations.find(station => station.name === name);
            foundStationWithUnique = this.props.stations.find(station => station.unique === unique);
            if(foundStationWithName && foundStationWithName.name === lastName){foundStationWithName=undefined}
            if(foundStationWithUnique && foundStationWithUnique.unique === lastUnique){foundStationWithUnique=undefined}
            if(foundStationWithName){
                notifyStationNameExists();
            }else if(foundStationWithUnique){
                notifyStationUniqueExists();
            }else{
                if(lastName){
                    this.props.dispatch(startEditStation(lastName, name, unique, user_id, location, is_active, privacy, description, categories))
                        .then((val='')=>{
                            if(val!=='same'){
                                notifyEditedStation();
                                this.props.history.push('/stations');
                            } else {
                                notifyNoChangesMade();
                            }
                    })
                }else{
                    this.props.dispatch(startCreateStation(name, unique, user_id, location, is_active, privacy, description, categories))
                        .then(()=>{
                            notifyCreatedStation();
                            this.props.history.push('/stations');
                        })
                }
            }
        }
    }

    render(){

        //***** DESTRUCT
        let {profile, users, categories} = this.props;

        //***** STATION DETAILS FORM
        let stationDetailsForm = (
            <StationCreateOrEditFormDetails
                showOwnership={true}
                profile={profile}
                users={users}
                {...this.state}
                onChangeValue={this.handleChangeValue}
            />
        );

        //***** CATEGORIES LIST
        let categoriesList = (
            <StationCreateCategoriesList
                allCategories={categories}
                checkedCategories={this.state.categories}
                onClickChangeCategoryList={this.handleChangeCategoryList}
            />
        );

        //***** GENERATE URL
        let generateUrl = (
            !!categories.length &&
            <StationGenerateUrl
                lastName={this.state.lastName}
                unique={this.state.unique}
                is_active={this.state.is_active}
                checkedCategories={this.state.categories}
                allCategories={categories}
            />
        );

        return (
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="col-sm-6">
                        {stationDetailsForm}
                    </div>
                    <div className="col-sm-6">
                        {categoriesList}
                        {generateUrl}
                    </div>
                </form>
        );
    }
}

const mapStateToProps = state => ({
        profile: state.user,
        categories: state.categories,
        users: state.users,
        stations: state.stations
    });

export default withRouter(connect(mapStateToProps)(StationCreateOrEditAdmin))
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import StationCreateCategoriesList from "./StationCreateCategoriesList";
import {
    notifyCreatedStation,
    notifyCreatedStationEmptyFields, notifyEditedStation, notifyGeneralStationCreateInfo, notifyNoChangesMade
} from "../../general_functions/notifiers";
import {startCreateStationForUser, startEditStationForUser} from "../../actions/Station";
import StationCreateOrEditFormDetails from "./StationCreateOrEditFormDetails";
import StationGenerateUrl from "./StationGenerateUrl";
import {regexFindGreek} from "../../general_functions/generalFunctions";


class StationCreateOrEditUser extends React.Component {
    state = this.props.station ?
        {
            name: this.props.station.name,
            unique:  this.props.station.unique,
            location:  this.props.station.location,
            is_active:  this.props.station.is_active.toString(),
            privacy:  this.props.station.privacy,
            description: this.props.station.description ? this.props.station.description : '',
            categories: this.props.station.categories.length ? this.props.station.categories.map(category=>category.id) : [],
            lastName: this.props.station.name
        }
        :
        {
        name: '',
        unique: '',
        location: '',
        is_active: '',
        privacy: '',
        description: '',
        categories: [],
        lastName: undefined
    };
    componentDidMount(){
        !this.state.lastName && notifyGeneralStationCreateInfo();
    }
    handleChangeValue = (e) => {
        if (e.target.name !== 'unique') {
            this.setState({[e.target.name]: e.target.value})
        } else {
            !regexFindGreek(e.target.value) && this.setState({[e.target.name]: e.target.value})
        }
    }
    handleChangeCategoryList = (e) => {
        let insertId = parseInt(e.target.value.trim());
        let checked = e.target.checked;
        this.setState(prev=>({categories: checked ?
                prev.categories.concat(insertId)
                :
                prev.categories.filter(id => id !== insertId)
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let name = this.state.name.trim();
        let unique = this.state.unique.trim();
        let location = this.state.location.trim();
        let is_active = this.state.is_active.trim();
        let privacy = this.state.privacy.trim();
        let description = this.state.description;
        let categories = this.state.categories;
        let lastName = this.state.lastName;

        if(!name || !unique || !location || !is_active || !privacy){
            notifyCreatedStationEmptyFields();
        }else{
            description = description.trim() === '' ? null : description.trim();
            is_active = parseInt(is_active);
            let user_id = this.props.profile.id;
            if(lastName){
                this.props.dispatch(startEditStationForUser(lastName, name, unique, user_id, location, is_active, privacy, description, categories)).then((val=0)=>{
                    if(val!==1){
                        if(val === 'same'){
                            notifyNoChangesMade();
                        } else{
                            notifyEditedStation();
                            this.props.history.push('/stations');
                        }
                    }
                })
            } else {
                this.props.dispatch(startCreateStationForUser(name, unique, user_id, location, is_active, privacy, description, categories)).then((val=0)=>{
                    if(val!==1){
                        notifyCreatedStation();
                        this.props.history.push('/stations');
                    }
                })
            }
        }
    }

    render(){

        //***** DESTRUCT
        let {categories} = this.props;

        //***** STATION DETAILS FORM
        let stationDetailsForm = (
            <StationCreateOrEditFormDetails
                showOwnership={false}
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
            categories.length &&
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
        categories: state.categories
    });

export default withRouter(connect(mapStateToProps)(StationCreateOrEditUser))
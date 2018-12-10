import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import StationCreateCategoriesList from "./StationCreateCategoriesList";
import {
    notifyCreatedStation,
    notifyCreatedStationEmptyFields, notifyEditedStation, notifyStationNameExists,
    notifyStationUniqueExists
} from "../general_functions/notifiers";
import {startCreateStation, startEditStation} from "../actions/Station";
import StationCreateOrEditAdminDetails from "./StationCreateOrEditAdminDetails";


class StationCreateOrEditAdmin extends React.Component {
    constructor(props){
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changeUnique = this.changeUnique.bind(this);
        this.changeUserId = this.changeUserId.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeIsActive = this.changeIsActive.bind(this);
        this.changePrivacy = this.changePrivacy.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeCategories = this.changeCategories.bind(this);
        this.submit = this.submit.bind(this);
        this.state = props.station ?
            {
                name: props.station.name,
                unique: props.station.unique,
                user_id: props.station.user_id.toString(),
                location: props.station.location,
                is_active: props.station.is_active.toString(),
                privacy: props.station.privacy,
                description: props.station.description === null ? '' : props.station.description,
                categories: props.station.categories.length > 0 ? props.station.categories.map((category)=>category.id) : [],
                lastName: props.station.name,
                lastUnique: props.station.unique,
            }
            :
            {
                name:'',
                unique: '',
                user_id: '',
                location: '',
                is_active: '',
                privacy: '',
                description: '',
                categories: [],
                lastName: undefined,
                lastUnique: undefined
            }
    }
    changeName(e){
        this.setState({name: e.target.value})
    }
    changeUnique(e){
        this.setState({unique: e.target.value})
    }
    changeUserId(e){
        this.setState({user_id: e.target.value})
    }
    changeLocation(e){
        this.setState({location: e.target.value})
    }
    changeIsActive(e){
        this.setState({is_active: e.target.value})
    }
    changePrivacy(e){
        this.setState({privacy: e.target.value})
    }
    changeDescription(e){
        this.setState({description: e.target.value})
    }
    changeCategories(e){
        let insertId = parseInt(e.target.value.trim());
        let checked = e.target.checked;
        this.setState((prev)=>{
            return {
                categories: checked ?
                    prev.categories.concat(insertId)
                    :
                    prev.categories.filter((id)=>id !== insertId)
            }
        })
    }
    submit(e){
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
            description === '' ? description = null : description = description.trim();
            is_active = parseInt(is_active);
            user_id = parseInt(user_id);
            let foundStationWithName;
            let foundStationWithUnique;
            foundStationWithName = this.props.stations.find((station)=>station.name === name);
            foundStationWithUnique = this.props.stations.find((station)=>station.unique === unique);
            if(foundStationWithName && foundStationWithName.name === lastName){foundStationWithName=undefined}
            if(foundStationWithUnique && foundStationWithUnique.unique === lastUnique){foundStationWithUnique=undefined}
            if(foundStationWithName){
                notifyStationNameExists();
            }else if(foundStationWithUnique){
                notifyStationUniqueExists();
            }else{
                if(lastName){
                    this.props.dispatch(startEditStation(lastName, name, unique, user_id, location, is_active, privacy, description, categories)).then(()=>{
                        notifyEditedStation();
                        this.props.history.push('/stations');
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
        return (
                <form onSubmit={this.submit} className="row">
                <StationCreateOrEditAdminDetails profile={this.props.profile}
                                           users={this.props.users}
                                           {...this.state}
                                           changeName={this.changeName}
                                           changeUnique={this.changeUnique}
                                           changeUserId={this.changeUserId}
                                           changeLocation={this.changeLocation}
                                           changeIsActive={this.changeIsActive}
                                           changePrivacy={this.changePrivacy}
                                           changeDescription={this.changeDescription}/>

                <StationCreateCategoriesList categories={this.props.categories}
                                             checkedCategories={this.state.categories}
                                             changeCategories={this.changeCategories}/>
                </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.user,
        users: state.users,
        stations: state.stations,
        categories: state.categories
    }
};

export default withRouter(connect(mapStateToProps)(StationCreateOrEditAdmin))
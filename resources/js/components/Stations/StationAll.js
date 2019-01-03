import React from 'react';
import {connect} from "react-redux";
import Pagination from "react-js-pagination";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import ModalStationDelete from "./ModalStationDelete";
import {startDeleteStationFromAdmin, startEditStationFromAll} from "../../actions/Station";
import {
    notifyDeletedStation, notifyDeletedStationCollections,
    notifyEditedStation, notifyNoChangesMade
} from "../../general_functions/notifiers";
import StationAllEdit from "./StationAllEdit";
import {CardBelowHeaderTitle, CardHeaderTitle} from "../../containers/generalContainers";
import StationAllRender from "./StationAllRender";

class StationAll extends React.Component {
    state = {
        deleteStation: undefined,
        showEditComp: false,
        editStation: undefined,
        user_id: undefined,
        is_active: undefined,
        privacy: undefined,
        activePage: 1,
        itemsCountPerPage: 8,
        pageRangeDisplayed: 3,
        firstIndex: 0,
        lastIndex: 0
    };
    componentDidMount() {
        this.checkForPagination()
    }
    componentDidUpdate(prevProps){
        if(this.props.stations.length < prevProps.stations.length){
            this.setState({activePage: 1}, () => this.checkForPagination());
        }
    }
    checkForPagination = () => {
        let firstIndex = 0;
        let lastIndex = this.state.itemsCountPerPage;
        if(this.props.stations.length > this.state.itemsCountPerPage){
            lastIndex = this.state.activePage * this.state.itemsCountPerPage;
            firstIndex = lastIndex - this.state.itemsCountPerPage;
        }
        this.setState({
            firstIndex,
            lastIndex
        })
    }
    handlePageChange = (pageNumber) => {
        this.clearAllInputsAndSetIncomingData();
        this.setState({activePage: pageNumber}, () => this.checkForPagination());
    }
    clearAllInputsAndSetIncomingData = (showEditComp=false, editStation=undefined, user_id=undefined, is_active=undefined, privacy=undefined) => {
        this.setState({
            showEditComp: false,
            editStation: undefined,
            user_id: undefined,
            is_active: undefined,
            privacy: undefined,
        }, () => {
            if(showEditComp && editStation && user_id && privacy){
                this.setState({
                    showEditComp,
                    editStation,
                    user_id: user_id.toString(),
                    is_active: is_active.toString(),
                    privacy
                })
            }
        })
    }
    closeEditComp = () => this.clearAllInputsAndSetIncomingData();
    handleChangeValue = (e) => this.setState({[e.target.name]: e.target.value})
    editStation = (e) => {
        e.preventDefault();
        let name = this.state.editStation;
        let user_id = parseInt(this.state.user_id.trim());
        let is_active = parseInt(this.state.is_active.trim());
        let privacy = this.state.privacy.trim();
        this.props.dispatch(startEditStationFromAll(name, user_id, is_active, privacy)).then((val='')=>{
            if(val!== 'same'){
                notifyEditedStation();
                this.clearAllInputsAndSetIncomingData();
            } else {
                notifyNoChangesMade();
            }

        })
    }
    deleteStation = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteStationFromAdmin(this.state.deleteStation)).then((val=1)=>{
            notifyDeletedStation();
            if(val===2){
                notifyDeletedStationCollections();
            }
            this.clearAllInputsAndSetIncomingData();
        })
    }

    render(){

        //******DESTRUCT
        let {stations, users, profile} = this.props;

        //******RENDER STATIONS
        let stationRender = (
            <StationAllRender
                {...this.props}
                {...this.state}
                onClickEdit={(name, user_id, is_active, privacy) => this.clearAllInputsAndSetIncomingData(true, name, user_id, is_active, privacy)}
                onClickDelete={(name) => {
                    this.clearAllInputsAndSetIncomingData();
                    this.setState({deleteStation: name}, ()=>$('#modal').modal())
                }}
            />
        );

        //******CHECK AND RENDER PAGINATION
        let pagination = (
            stations.length > this.state.itemsCountPerPage &&
            <Pagination
                activePage={this.state.activePage}
                totalItemsCount={stations.length}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                itemsCountPerPage={this.state.itemsCountPerPage}
                onChange={this.handlePageChange}
                innerClass={'pagination justify-content-center'}
                itemClass={'page-item'}
                linkClass={'page-link'}
            />
        );

        //******CHECK AND RENDER STATION_EDIT
        let stationEdit = (
            this.state.showEditComp &&
            <StationAllEdit
                {...this.state}
                onChangeValue={this.handleChangeValue}
                users={users}
                profile={profile}
                closeEdit={this.closeEditComp}
                edit={this.editStation}
            />
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let modalForDelete = (
            this.state.deleteStation &&
            <ModalStationDelete
                deleteStation={this.deleteStation}
                nameOfStation={this.state.deleteStation}
            />

        );

        return (
            <div className="content">
                <div>
                    <CardHeaderTitle name='Σταθμοί'/>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <CardBelowHeaderTitle name='Προβολή όλων των σταθμών'/><hr/>
                            <div className="card-body">
                                {stations.length > 0 ?
                                    <div className="table-responsive">
                                        {stationRender}
                                        {pagination}
                                    </div>
                                :
                                    <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν σταθμοί</h4>
                                }
                            </div>
                        </div>
                        {stationEdit}
                    </div>
                </div>
                {modalForDelete}
            </div>
        );
    }
}

const mapStateToProps = state => ({
        stations: state.stations,
        users: state.users,
        collections: state.collections,
        profile: state.user
    });

export default connect(mapStateToProps)(StationAll)
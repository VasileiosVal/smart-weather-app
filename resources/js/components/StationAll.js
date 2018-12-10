import React from 'react';
import {connect} from "react-redux";
import Pagination from "react-js-pagination";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import ModalStationDelete from "./ModalStationDelete";
import {startDeleteStationFromAdmin, startEditStationFromAll} from "../actions/Station";
import {notifyDeletedStation, notifyEditedStation} from "../general_functions/notifiers";
import StationAllEdit from "./StationAllEdit";

class StationAll extends React.Component {
    constructor(props){
        super(props);
        this.checkForPagination = this.checkForPagination.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.deleteStation = this.deleteStation.bind(this);
        this.clearAllInputsAndSetIncomingData = this.clearAllInputsAndSetIncomingData.bind(this);
        this.closeEditComp = this.closeEditComp.bind(this);
        this.editUser = this.editUser.bind(this);
        this.changeUserId = this.changeUserId.bind(this);
        this.changeIsActive = this.changeIsActive.bind(this);
        this.changePrivacy = this.changePrivacy.bind(this);
        this.state = {
            deleteStation: undefined,
            showEditComp: false,
            editCompStationName: undefined,
            editCompStationUserId: undefined,
            editCompStationIsActive: undefined,
            editCompStationPrivacy: undefined,
            activePage: 1,
            itemsCountPerPage: 8,
            pageRangeDisplayed: 3,
            firstIndex: 0,
            lastIndex: 0
        }
    }
    componentDidMount() {
        this.checkForPagination()
    }
    componentDidUpdate(prevProps){
        if(this.props.stations.length < prevProps.stations.length){
            this.setState(
                {activePage: 1},
                () => this.checkForPagination()
            );
        }
    }
    checkForPagination(){
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
    handlePageChange(pageNumber) {
        this.clearAllInputsAndSetIncomingData();
        this.setState(
            {activePage: pageNumber},
            () => this.checkForPagination()
        );
    }
    clearAllInputsAndSetIncomingData(showEditComp=false, editCompStationName=undefined, editCompStationUserId=undefined, editCompStationIsActive=undefined, editCompStationPrivacy=undefined){
        this.setState({
            deleteStation: undefined,
            showEditComp: false,
            editCompStationName: undefined,
            editCompStationUserId: undefined,
            editCompStationIsActive: undefined,
            editCompStationPrivacy: undefined,
        }, () => {
            if(showEditComp && editCompStationName && editCompStationUserId && editCompStationPrivacy){
                this.setState({
                    showEditComp,
                    editCompStationName,
                    editCompStationUserId: editCompStationUserId.toString(),
                    editCompStationIsActive: editCompStationIsActive.toString(),
                    editCompStationPrivacy
                })
            }
        })
    }
    closeEditComp(){
        this.clearAllInputsAndSetIncomingData();
    }
    changeUserId(e){
        this.setState({editCompStationUserId: e.target.value})
    }
    changeIsActive(e){
        this.setState({editCompStationIsActive: e.target.value})
    }
    changePrivacy(e){
        this.setState({editCompStationPrivacy: e.target.value})
    }
    editUser(e){
        e.preventDefault();
        let name = this.state.editCompStationName;
        let user_id = parseInt(this.state.editCompStationUserId.trim());
        let is_active = parseInt(this.state.editCompStationIsActive.trim());
        let privacy = this.state.editCompStationPrivacy;
        this.props.dispatch(startEditStationFromAll(name, user_id, is_active, privacy)).then(()=>{
            notifyEditedStation();
            this.clearAllInputsAndSetIncomingData();
            this.props.history.push('/stations/all');
        })
    }
    deleteStation(){
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteStationFromAdmin(this.state.deleteStation)).then(()=>{
            notifyDeletedStation();
            this.clearAllInputsAndSetIncomingData();
        })
    }
    render(){
        return(
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Σταθμοί</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                <h4 className="text-center">Προβολή όλων των σταθμών</h4>
                            </div>
                            <hr/>
                            <div className="card-body">
                                {this.props.stations.length > 0 ?
                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead className="text-primary">
                                            <tr>
                                                <th>id</th>
                                                <th>Όνομα</th>
                                                <th>Μοναδικός κωδικός</th>
                                                <th>Ιδιοκτησία</th>
                                                <th>Επιλεγμένες κατηγορίες</th>
                                                <th>Συλογές μετρήσεων</th>
                                                <th>Ενεργός</th>
                                                <th>Προβολή</th>
                                                <th>Τοποθεσία</th>
                                                <th>Περιγραφή</th>
                                                <th>Ημ. δημιουργίας</th>
                                                <th>Ενέργειες</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.stations.slice(this.state.firstIndex, this.state.lastIndex).map((station) => {
                                                return <tr key={station.id}>
                                                    <td>{station.id}</td>
                                                    <td>{station.name}</td>
                                                    <td>{station.unique.length > 10 ? `${station.unique.substr(0, 10)}...` : station.unique}</td>
                                                    <td>{station.user_id === this.props.profile.id ?
                                                        <Link title='Μετάβαση στο προφίλ μου' to='/profile'>{this.props.profile.email}</Link>
                                                         :
                                                        this.props.users.find((user)=>user.id === station.user_id).email}
                                                        </td>
                                                    <td>{station.categories.length}</td>
                                                    <td>{this.props.collections.filter((collection)=>collection.station_id === station.id).length}</td>
                                                    <td>{station.is_active ? 'Ναι' : 'Οχι'}</td>
                                                    <td>{station.privacy === 'public' ? 'Δημόσιος' : 'Ιδιωτικός'}</td>
                                                    <td>{station.location}</td>
                                                    <td>{station.description ? station.description.length >10 ? `${station.description.substr(0, 10)}...` : station.description : '-'}</td>
                                                    <td>{moment(station.created_at).fromNow()}</td>
                                                    {station.user_id !== 1 && station.user_id !== this.props.profile.id &&
                                                    <td>
                                                        <i title='Επεξεργασία'
                                                           onClick={() => {
                                                               this.clearAllInputsAndSetIncomingData(true, station.name, station.user_id, station.is_active, station.privacy)
                                                           }}
                                                           className='fa fa-edit mx-2 point'/>

                                                        <i title='Διαγραφή'
                                                           onClick={() => {
                                                               this.clearAllInputsAndSetIncomingData();
                                                               this.setState({deleteStation: station.name}, ()=>{
                                                                   $('#modal').modal();
                                                               })
                                                           }}
                                                           className='fas fa-trash-alt mx-2 point'/>
                                                    </td>
                                                    }
                                                </tr>
                                            })}
                                            </tbody>
                                        </table>
                                        {this.props.stations.length > this.state.itemsCountPerPage &&
                                        <Pagination
                                            activePage={this.state.activePage}
                                            totalItemsCount={this.props.stations.length}
                                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                                            itemsCountPerPage={this.state.itemsCountPerPage}
                                            onChange={this.handlePageChange}
                                            innerClass={'pagination justify-content-center'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                        />
                                        }
                                    </div>
                                    :
                                    <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν σταθμοί</h4> }
                            </div>
                        </div>
                        {this.state.showEditComp &&
                        <StationAllEdit {...this.state}
                        changeUserId={this.changeUserId}
                        changeIsActive={this.changeIsActive}
                        changePrivacy={this.changePrivacy}
                        users={this.props.users}
                        profile={this.props.profile}
                        closeEdit={this.closeEditComp}
                        edit={this.editUser}/>
                        }
                    </div>
                </div>
                {this.state.deleteStation &&
                <ModalStationDelete deleteStation={this.deleteStation}
                                    nameOfStation={this.state.deleteStation}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stations: state.stations,
        users: state.users,
        collections: state.collections,
        profile: state.user
    }
};

export default connect(mapStateToProps)(StationAll)
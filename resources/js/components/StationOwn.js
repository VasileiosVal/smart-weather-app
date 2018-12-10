import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import Pagination from "react-js-pagination";
import moment from "moment/moment";
import ModalStationDelete from "./ModalStationDelete";
import {startDeleteStation} from "../actions/Station";
import {notifyDeletedStation} from "../general_functions/notifiers";
class StationOwn extends React.Component {
    constructor(props){
        super(props);
        this.checkForPagination = this.checkForPagination.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.deleteStation = this.deleteStation.bind(this);
        this.state = {
            deleteStation: undefined,
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
        this.setState(
            {activePage: pageNumber},
            () => this.checkForPagination()
        );
    }
    deleteStation(){
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteStation(this.state.deleteStation)).then(()=>{
            notifyDeletedStation();
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
                                <h4 className="text-center">Προβολή όλων των σταθμών μου</h4>
                            </div>
                            <hr/>
                            <div className="card-body">
                                {this.props.stations.length > 0 ?
                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead className="text-primary">
                                            <tr>
                                                {this.props.isAdmin && <th>id</th>}
                                                <th>Όνομα</th>
                                                <th>Μοναδικός κωδικός</th>
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
                                                    {this.props.isAdmin && <td>{station.id}</td>}
                                                    <td>{station.name}</td>
                                                    <td>{station.unique.length > 10 ? `${station.unique.substr(0, 10)}...` : station.unique}</td>
                                                    <td>{station.categories.length}</td>
                                                    <td>{this.props.collections.filter((collection)=>collection.station_id === station.id).length}</td>
                                                    <td>{station.is_active ? 'Ναι' : 'Οχι'}</td>
                                                    <td>{station.privacy === 'public' ? 'Δημόσιος' : 'Ιδιωτικός'}</td>
                                                    <td>{station.location}</td>
                                                    <td>{station.description ? station.description.length >10 ? `${station.description.substr(0, 10)}...` : station.description : '-'}</td>
                                                    <td>{moment(station.created_at).fromNow()}</td>
                                                    <td>
                                                        <Link className='edit-fa' to={`/stations/${station.name}/edit`}><i title='Επεξεργασία' className='fa fa-edit mx-2 point'/></Link>

                                                        <i title='Διαγραφή'
                                                           onClick={() => {
                                                               this.setState({deleteStation: station.name}, ()=>{
                                                                   $('#modal').modal();
                                                               })
                                                           }}
                                                           className='fas fa-trash-alt mx-2 point'/>
                                                    </td>
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
        stations: state.stations.filter((station)=>station.user_id === state.user.id),
        collections: state.collections,
        isAdmin: state.user.role_id === 1
    }
};

export default connect(mapStateToProps)(StationOwn)
import React from 'react';
import {connect} from "react-redux";
import Pagination from "react-js-pagination";
import ModalStationDelete from "./ModalStationDelete";
import {startDeleteStation} from "../../actions/Station";
import {notifyDeletedStation, notifyDeletedStationCollections} from "../../general_functions/notifiers";
import {CardBelowHeaderTitle, CardHeaderTitle} from "../../containers/generalContainers";
import StationOwnRender from "./StationOwnRender";
class StationOwn extends React.Component {
    state = {
        deleteStation: undefined,
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
        if(this.props.stations.length < prevProps.stations.length && this.state.activePage > 1){
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
    handlePageChange = pageNumber => {
        this.setState(
            {activePage: pageNumber},
            () => this.checkForPagination()
        );
    }
    deleteStation = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteStation(this.state.deleteStation)).then((val=1)=>{
            notifyDeletedStation();
            if(val===2){
                notifyDeletedStationCollections();
            }
        })
    }

    render(){

        //******RENDER STATIONS
        let stationOwnRender = (
            <StationOwnRender
                {...this.props}
                {...this.state}
                onClickDelete={name => this.setState({deleteStation: name}, ()=>$('#modal').modal())}
            />
        );

        //******CHECK AND RENDER PAGINATION
        let pagination = (
            this.props.stations.length > this.state.itemsCountPerPage &&
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
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let modalForDelete = (
            !!this.state.deleteStation &&
            <ModalStationDelete
                deleteStation={this.deleteStation}
                nameOfStation={this.state.deleteStation}
                clearDelete={() => this.setState({deleteStation: undefined})}
            />
        );

        return (
            <div className="content">
                <div><CardHeaderTitle name='Σταθμοί'/></div>
                <div className="row">
                    <div className="col-12">
                        <div className="card animated fadeIn fast">
                            <CardBelowHeaderTitle name='Προβολή όλων των σταθμών μου'/><hr/>
                            <div className="card-body">
                                {!!this.props.stations.length ?
                                    <div className="table-responsive">
                                        {stationOwnRender}
                                        {pagination}
                                    </div>
                                :
                                    <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν σταθμοί</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {modalForDelete}
            </div>
        );
    }
}

const mapStateToProps = state => ({
        stations: state.stations.filter(station => station.user_id === state.user.id),
        collections: state.collections,
        isAdmin: state.user.role_id === 1
    });

export default connect(mapStateToProps)(StationOwn)
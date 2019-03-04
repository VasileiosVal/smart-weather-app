import React from 'react';
import {connect} from 'react-redux';
import {
    examineValue,
    filterDate,
    filterOnUsers, findStationsWithCollections,
    notifyUnauthorizedActionAndLogout, returnCategoryNamesWithSymbolArrayFromMeasures
} from "../../general_functions/generalFunctions";
import {BarChart, NoMeasuresMessage, WaitingLoader} from "../../containers/generalContainers";
import MeasuresStationsRenderOnUsers from "./MeasuresStationsRenderOnUsers";
import MeasuresStationCollectionsRenderOnUsers from "./MeasuresStationCollectionsRenderOnUsers";
import ModalCollectionDelete from "./ModalCollectionDelete";
import {startDeleteCollection} from "../../actions/Collection";
import {notifyDeletedCollection, notifyGeneralUpdatedList} from "../../general_functions/notifiers";
import MeasuresCollectionMeasuresRender from "./MeasuresCollectionMeasuresRender";

class MeasuresUser extends React.Component {
    state = {
        showFirstInitLoader: true,
        stationsWithCollections: [],
        initCollectionsLoader: false,
        showCollections: false,
        selectedStationCollections: [],
        collectionsWithMeasures: [],
        initMeasuresLoader: false,
        showMeasures: false,
        showCollectionHash: '',
        collectionMeasures: [],
        sortBy: 'all',
        searchQuery: '',
        startDate: null,
        endDate: null,
        deleteStationHash: undefined
    };
    componentDidMount(){
        this.fetchAllStations(this.listenAllEvents);
    }
    componentDidUpdate(prevProps){
        if(this.props.myStationsWithCollections < prevProps.myStationsWithCollections ||
            this.props.myCollections < prevProps.myCollections ||
            this.props.myStationsWithCollections > prevProps.myStationsWithCollections ||
            this.props.myCollections > prevProps.myCollections){
            this.loadDefaultState(this.fetchAllStations);
        }
    }
    componentWillUnmount(){
        window.Echo.channel('station').stopListening('stationAllScenariosInformUsersOnMeasures');
        window.Echo.channel('station').stopListening('needForRender');
    }

    loadDefaultState = (func) => this.setState({
        showFirstInitLoader: true,
        stationsWithCollections: [],
        initCollectionsLoader: false,
        showCollections: false,
        selectedStationCollections: [],
        collectionsWithMeasures: [],
        initMeasuresLoader: false,
        showMeasures: false,
        showCollectionHash: '',
        collectionMeasures: [],
        sortBy: 'all',
        searchQuery: '',
        startDate: null,
        endDate: null,
        deleteStationHash: undefined
    }, func)
    fetchAllStations = (func = null) => {
        axios('/api/auth/collections/stations')
            .then(response => {
                if(response.data.length){
                    let stationsWithCollections=[];
                    response.data.forEach(station => {
                        let [id, name, collections] = station;
                        stationsWithCollections.push({id, name, collections});
                    })
                    !!func ?
                        this.setState({stationsWithCollections, showFirstInitLoader: false}, func)
                        :
                        this.setState({stationsWithCollections, showFirstInitLoader: false})
                } else {
                    !!func ?
                        this.setState({showFirstInitLoader: false}, func)
                        :
                        this.setState({showFirstInitLoader: false})
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout());
    }
    listenAllEvents = () => {
        window.Echo.channel('station').listen('stationAllScenariosInformUsersOnMeasures', e => {
            let found = this.state.stationsWithCollections.some(station => e.stations.includes(station.id))
            if(found) {
                this.loadDefaultState(this.fetchAllStations);
                notifyGeneralUpdatedList();
            }
        })
        window.Echo.channel('station').listen('needForRender', () => {
            this.loadDefaultState(this.fetchAllStations);
            notifyGeneralUpdatedList();
        })
    }

    handleChangeFilters = e => this.setState({
        initCollectionsLoader: false,
        showCollections: false,
        selectedStationCollections: [],
        collectionsWithMeasures: [],
        initMeasuresLoader: false,
        showMeasures: false,
        showCollectionHash: '',
        collectionMeasures: [],
        startDate: null,
        endDate: null,
        searchQuery: e.target.name === 'searchQuery' ? e.target.value : '',
        sortBy: e.target.name === 'sortBy' ? e.target.value : 'all'
    })

    handleChangeDateStart = date => {
        if(!date) {
            this.setState({startDate: null, endDate: null, initMeasuresLoader: false, showMeasures: false, showCollectionHash: '', collectionMeasures: []})
        } else {
            this.state.endDate && this.state.endDate < date ?
                this.setState({startDate: this.state.endDate, initMeasuresLoader: false, showMeasures: false, showCollectionHash: '', collectionMeasures: []})
                :
                this.setState({startDate: date, initMeasuresLoader: false, showMeasures: false, showCollectionHash: '', collectionMeasures: []})
        }
    }
    handleChangeDateEnd = date => {
        if(!this.state.startDate){
            this.setState({endDate: null, initMeasuresLoader: false, showMeasures: false, showCollectionHash: '', collectionMeasures: []})
        } else {
            date && date < this.state.startDate ?
                this.setState({endDate: this.state.startDate, initMeasuresLoader: false, showMeasures: false, showCollectionHash: '', collectionMeasures: []})
                :
                this.setState({endDate: date, initMeasuresLoader: false, showMeasures: false, showCollectionHash: '', collectionMeasures: []})
        }
    }

    handleRenderCollections = id => {
        this.setState({
            initCollectionsLoader: true,
            showCollections: false,
            selectedStationCollections: [],
            collectionsWithMeasures: [],
            initMeasuresLoader: false,
            showMeasures: false,
            showCollectionHash: '',
            collectionMeasures: [],
            startDate: null,
            endDate: null
        }, () => {
            let selectedStation = this.state.stationsWithCollections.find(station => station.id === id);
            let selectedStationCollections = selectedStation ? selectedStation.collections : [];
            let collectionsIds = selectedStationCollections.map(collection => collection.id);
            axios.post('/api/auth/collections/measures', {collectionsIds})
                .then(response=>{
                    let collectionsWithMeasures = [];
                    selectedStationCollections.forEach(collection => {
                        let obj = {};
                        let collectionMeasures =[];
                        obj.col_id = collection.id;
                        response.data.find(col => col.id === collection.id).measures.forEach(measure=>{
                            collectionMeasures.push({
                                cat_id: measure.category_id,
                                value: examineValue(measure.value)
                            })
                        })
                        obj.measures = collectionMeasures;
                        collectionsWithMeasures.push(obj);
                    })
                    this.setState({
                        showCollections: true,
                        selectedStationCollections,
                        collectionsWithMeasures,
                        initCollectionsLoader: false
                    })
                })
                .catch(e => notifyUnauthorizedActionAndLogout());
            //this.setState({selectedStationCollections, showCollections: true, initCollectionsLoader: false});
        })
    }
    handleRenderMeasures = id => {
        this.setState({initMeasuresLoader: true, showMeasures: false, showCollectionHash: '', collectionMeasures: []
        }, () => {
            let collectionMeasures = this.state.collectionsWithMeasures.find(data => data.col_id === id).measures;
            let showCollectionHash = this.state.selectedStationCollections.find(collection => collection.id === id).series_hash;
            this.setState({showMeasures: true, collectionMeasures, showCollectionHash, initMeasuresLoader: false});
        })
    }

    handleOpenModalForDelete = hash => {
        this.setState({
            deleteStationHash: hash
        }, () => {$('#modal').modal()})
    }
    handleCloseModal = () => {
        $('#modal').modal('hide');
        this.setState({deleteStationHash: undefined})
    }

    handleDeleteCollection = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteCollection(this.state.deleteStationHash)).then(()=>notifyDeletedCollection());
    }


    render(){
        //***** DESTRUCT
        let {myStationsWithCollections, myCollections, profile, categories} = this.props;

        //***** SORTING_FILTERING STATIONS
        let filteredStationsWithCollections = filterOnUsers(this.state.stationsWithCollections, myStationsWithCollections, profile, this.state.sortBy, this.state.searchQuery);
        //*****FILTERED STATIONS_WITH_COLLECTIONS RENDER
        let stationsWithCollectionsRender = (
            <MeasuresStationsRenderOnUsers
                sortBy={this.state.sortBy}
                searchQuery={this.state.searchQuery}
                onChangeFilters={this.handleChangeFilters}
                filteredStationsWithCollections={filteredStationsWithCollections}
                myStationsWithCollections={myStationsWithCollections}
                onClickRenderCollections={this.handleRenderCollections}
            />
        );

        //***** FILTERING SELECTED_STATION_COLLECTIONS
        let filteredSelectedStationCollections = filterDate(this.state.selectedStationCollections, this.state.startDate, this.state.endDate);
        //*****SELECTED_STATION_COLLECTIONS RENDER
        let selectedStationCollectionsRender = (
            <MeasuresStationCollectionsRenderOnUsers
                {...this.state}
                filteredSelectedStationCollections={filteredSelectedStationCollections}
                onClickChangeDateStart={this.handleChangeDateStart}
                onClickChangeDateEnd={this.handleChangeDateEnd}
                onClickRenderMeasures={this.handleRenderMeasures}
                categories={categories}
                myCollections={myCollections}
                onClickDeleteCollectionModal={this.handleOpenModalForDelete}
            />
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let deleteCollectionModal = (
            this.state.deleteStationHash &&
            <ModalCollectionDelete
                collectionHash={this.state.deleteStationHash}
                onTriggerCloseModal={this.handleCloseModal}
                onClickDeleteCollection={this.handleDeleteCollection}

            />
        );

        //*****SELECTED COLLECTION MEASURES RENDER
        let selectedCollectionMeasuresRender = (
            <MeasuresCollectionMeasuresRender
                initMeasuresLoader={this.state.initMeasuresLoader}
                showMeasures={this.state.showMeasures}
                showCollectionHash={this.state.showCollectionHash}
                collectionMeasures={this.state.collectionMeasures}
                categories={categories}
            />
        );

        //****** CHART RENDER
        let chart = (
            this.state.showMeasures && this.state.collectionMeasures.length &&
            <div className="card">
                <div className="card-body">
                    <BarChart
                        legend='Γράφημα τιμών μετρήσεων'
                        labelNames={returnCategoryNamesWithSymbolArrayFromMeasures(this.state.collectionMeasures, categories)}
                        labelValues={this.state.collectionMeasures.map(measure => measure.value)}
                        width={100}
                        height={300}
                    />
                </div>
            </div>
        );

        return (
            <div className="content swipe-up-content">
                {this.state.showFirstInitLoader ?
                    <WaitingLoader/>
                :
                    this.state.stationsWithCollections.length ?
                        <div className="row">
                            <div className="col-sm-5">
                            {stationsWithCollectionsRender}
                            {selectedStationCollectionsRender}
                            {deleteCollectionModal}
                            </div>
                            <div className="col-sm-7">
                            {selectedCollectionMeasuresRender}
                            {chart}
                            </div>
                        </div>
                    :
                        <NoMeasuresMessage header='Μετρήσεις'/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    let myStations = state.stations;
    let myCollections = state.collections;
    let myStationsWithCollections = findStationsWithCollections(myStations, myCollections);
    let categories = state.categories;
    let profile = state.profile;
    return {
        myStations,
        myCollections,
        myStationsWithCollections,
        categories,
        profile
    }
};

export default connect(mapStateToProps)(MeasuresUser)


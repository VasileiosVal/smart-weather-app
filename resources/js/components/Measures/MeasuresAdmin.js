import React from 'react';
import {connect} from 'react-redux';
import {
    returnCategoryNamesWithSymbolArrayFromMeasures,
    filter, findStationsWithCollections,
    notifyUnauthorizedActionAndLogout, filterDate, findCollectionsFromStationId, examineValue
} from "../../general_functions/generalFunctions";
import {BarChart, NoMeasuresMessage} from "../../containers/generalContainers";
import {startDeleteCollection} from "../../actions/Collection";
import {notifyDeletedCollection} from "../../general_functions/notifiers";
import ModalCollectionDelete from "./ModalCollectionDelete";
import MeasuresCollectionMeasuresRender from "./MeasuresCollectionMeasuresRender";
import MeasuresStationCollectionsRender from "./MeasuresStationCollectionsRender";
import MeasuresStationsRender from "./MeasuresStationsRender";

class MeasuresAdmin extends React.Component {
    state = {
        initCollectionsLoader: false,
        showCollections: false,
        selectedStationId: null,
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
    componentDidUpdate(prevProps){
        if(this.props.stationsWithCollections.length < prevProps.stationsWithCollections.length){
            this.setState({
                initCollectionsLoader: false,
                showCollections: false,
                selectedStationId: null,
                collectionsWithMeasures: [],
                initMeasuresLoader: false,
                showMeasures: false,
                showCollectionHash: '',
                collectionMeasures: [],
                startDate: null,
                endDate: null,
                sortBy: 'all',
                searchQuery: '',
                deleteStationHash: undefined
            })
        } else if(this.props.collections.length < prevProps.collections.length){
            this.setState({
                initMeasuresLoader: false,
                showMeasures: false,
                showCollectionHash: '',
                collectionMeasures: [],
                deleteStationHash: undefined
            })
        } else if(this.props.collections.length > prevProps.collections.length){
            if(this.state.selectedStationId) this.handleRenderCollections(this.state.selectedStationId)
        }
    }

    handleChangeFilters = e => this.setState({
        initCollectionsLoader: false,
        showCollections: false,
        selectedStationId: null,
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
            selectedStationId: null,
            collectionsWithMeasures: [],
            initMeasuresLoader: false,
            showMeasures: false,
            showCollectionHash: '',
            collectionMeasures: [],
            startDate: null,
            endDate: null,
            deleteStationHash: undefined
        }, ()=>{
            let stationCollections = this.props.collections.filter(collection => collection.station_id === id);
            let collectionsIds = stationCollections.map(collection => collection.id);
            axios.post('/api/auth/collections/measures', {collectionsIds})
                .then(response => {
                    let collectionsWithMeasures = [];
                    stationCollections.forEach(collection => {
                        let collectionMeasures = [];
                        response.data.find(col => col.id === collection.id).measures.forEach(measure => {
                            collectionMeasures.push({
                                cat_id: measure.category_id,
                                value: examineValue(measure.value)
                            })
                        })
                        collectionsWithMeasures.push({
                            col_id: collection.id,
                            measures: collectionMeasures
                        });
                    })
                    this.setState({
                        showCollections: true,
                        selectedStationId: id,
                        collectionsWithMeasures,
                        initCollectionsLoader: false
                    })
                })
                .catch(e => notifyUnauthorizedActionAndLogout());
        })
    }
    handleRenderMeasures = id => {
        this.setState({initMeasuresLoader: true, showMeasures: false, showCollectionHash: '', collectionMeasures: []}, () => {
            let collectionMeasures = this.state.collectionsWithMeasures.find(data => data.col_id === id).measures;
            let showCollectionHash = this.props.collections.find(collection => collection.id === id).series_hash;
            this.setState({showMeasures: true, collectionMeasures, showCollectionHash, initMeasuresLoader: false});
        })
    }

    handleOpenModalForDelete = hash => {
        this.setState({
            deleteStationHash: hash
        }, () => $('#modal').modal())
    }
    handleCloseModal = () => {
        $('#modal').modal('hide');
        this.setState({deleteStationHash: undefined})
    }

    handleDeleteCollection = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteCollection(this.state.deleteStationHash)).then(()=>notifyDeletedCollection())
    }

    render(){
        //***** DESTRUCT
        let {stationsWithCollections, collections, profile, categories} = this.props;

        //***** SORTING_FILTERING STATIONS
        let filteredStationsWithCollections = filter(stationsWithCollections, collections, profile, this.state.sortBy, this.state.searchQuery);
        //*****FILTERED STATIONS_WITH_COLLECTIONS RENDER
        let stationsWithCollectionsRender = (
            <MeasuresStationsRender
                sortBy={this.state.sortBy}
                searchQuery={this.state.searchQuery}
                onChangeFilters={this.handleChangeFilters}
                filteredStationsWithCollections={filteredStationsWithCollections}
                collections={collections}
                onClickRenderCollections={this.handleRenderCollections}
            />
        );

        //***** FILTERING SELECTED_STATION_COLLECTIONS
        let selectedStationCollections = findCollectionsFromStationId(this.state.selectedStationId, collections).sort((a, b) => b.id - a.id);
        let filteredSelectedStationCollections = filterDate(selectedStationCollections, this.state.startDate, this.state.endDate);
        //*****SELECTED_STATION_COLLECTIONS RENDER
        let selectedStationCollectionsRender = (
            <MeasuresStationCollectionsRender
                {...this.state}
                selectedStationCollections={selectedStationCollections}
                filteredSelectedStationCollections={filteredSelectedStationCollections}
                onClickChangeDateStart={this.handleChangeDateStart}
                onClickChangeDateEnd={this.handleChangeDateEnd}
                onClickRenderMeasures={this.handleRenderMeasures}
                categories={categories}
                onClickDeleteCollectionModal={this.handleOpenModalForDelete}
            />
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let deleteCollectionModal = (
            !!this.state.deleteStationHash &&
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
            this.state.showMeasures && !!this.state.collectionMeasures.length &&
            <div className="card animated pulse">
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
                {!!stationsWithCollections.length ?
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
};

const mapStateToProps = state => {
    let stations = state.stations;
    let collections = state.collections;
    let categories = state.categories;
    let stationsWithCollections = findStationsWithCollections(stations, collections);
    let profile = state.user;
    return {
        stationsWithCollections,
        collections,
        categories,
        profile
    }
};

export default connect(mapStateToProps)(MeasuresAdmin)
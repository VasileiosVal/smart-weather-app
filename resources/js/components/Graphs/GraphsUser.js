import React from 'react';
import {connect} from 'react-redux';
import {
    checkUpdatesOnUserStations, examineValue,
    filterDateOnStationsWithMeasures,
    filterSearchCategoriesOnGraphs,
    findStationsWithCollections, notifyUnauthorizedActionAndLogout,
    returnCategoriesArrayFromCategoriesIdsArray
} from "../../general_functions/generalFunctions";
import {NoMeasuresMessage, WaitingLoader} from "../../containers/generalContainers";
import GraphMinMax from "./GraphMinMax";
import GraphAllStationsMeasuresSpecificCategory from "./GraphAllStationsMeasuresSpecificCategory";
import CategoriesWithMeasuresRender from "./CategoriesWithMeasuresRender";
import {notifyGeneralUpdatedList} from "../../general_functions/notifiers";

class GraphsUser extends React.Component {
    state = {
        showFirstInitLoader: true,
        stationsWithCollections: [],
        minMaxMeasuresPerCategory: [],                  //1
        categoriesThatHaveMeasures: [],                 //2  1
        initStationsWithMeasuresLoader: false,          //2  2
        showStationsWithMeasuresPerCategory: false,     //2  2
        stationsWithMeasuresPerCategory: [],            //2  2
        selectedCategory: null,                         //2  2
        searchQuery: '',                                //2  1
        startDate: null,                                //2  2
        endDate: null,                                  //2  2
    };

    componentDidMount(){
        this.beginFetchData(this.listenAllEvents);
    }
    componentDidUpdate(prevProps){
        if(this.props.myStationsWithCollections < prevProps.myStationsWithCollections ||
            this.props.myCollections < prevProps.myCollections ||
            this.props.myStationsWithCollections > prevProps.myStationsWithCollections ||
            this.props.myCollections > prevProps.myCollections){
            this.loadDefaultState(this.beginFetchData);
        }
    }
    componentWillUnmount(){
        window.Echo.channel('station').stopListening('stationAllScenariosInformUsersOnMeasures');
        window.Echo.channel('station').stopListening('needForRender');
    }
    loadDefaultState = func => {
        this.setState({
            showFirstInitLoader: true,
            stationsWithCollections: [],
            minMaxMeasuresPerCategory: [],
            categoriesThatHaveMeasures: [],
            initStationsWithMeasuresLoader: false,
            showStationsWithMeasuresPerCategory: false,
            stationsWithMeasuresPerCategory: [],
            selectedCategory: null,
            searchQuery: '',
            startDate: null,
            endDate: null,
        }, func)
    }
    beginFetchData = (listen=null) => {
        this.fetchStationsWithCollections(this.fetchMinMaxMeasuresPerCategory(this.fetchAllCategoriesThatHaveMeasures));
        if(listen) listen();
    }
    listenAllEvents = () => {
        window.Echo.channel('station').listen('stationAllScenariosInformUsersOnMeasures', e => {
            let found = this.state.stationsWithCollections.some(station => e.stations.includes(station.id))
            if(found) {
                this.loadDefaultState(this.beginFetchData);
                notifyGeneralUpdatedList();
            }
        })
        window.Echo.channel('station').listen('needForRender', () => {
            this.loadDefaultState(this.beginFetchData);
            notifyGeneralUpdatedList();
        })
    }

    fetchStationsWithCollections = func => {
        axios('/api/auth/collections/stations')
            .then(response => {
                if(response.data.length){
                    let stationsWithCollections=[];
                    response.data.forEach(station => {
                        let [id, name] = station;
                        let obj={id,name};
                        stationsWithCollections.push(obj);
                    })
                    this.setState({stationsWithCollections}, func)
                } else {
                    this.setState({showFirstInitLoader: false});
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout());
    }
    fetchMinMaxMeasuresPerCategory = func => {
        axios('/api/auth/measures/latest')
            .then(response=>{
                if(response.data.length){
                    let minMaxMeasuresPerCategory=[];
                    response.data.forEach(data => {
                        let {category_id, min, max} = data;
                        min = {...min, value: examineValue(min.value)};
                        max = {...max, value: examineValue(max.value)};
                        let obj = {category_id, min, max};
                        minMaxMeasuresPerCategory.push(obj)
                    })
                    this.setState({minMaxMeasuresPerCategory}, func);
                } else {
                    this.setState({showFirstInitLoader: false});
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout());
    }
    fetchAllCategoriesThatHaveMeasures = () => {
        axios('/api/auth/measures/categories')
            .then(response => {
                if(response.data.length){
                    let categoriesThatHaveMeasures=[];
                    response.data.forEach(data => {
                        let {category_id, stations_ids} = data;
                        let obj = {category_id, stations_ids};
                        categoriesThatHaveMeasures.push(obj);
                    })
                    this.setState({categoriesThatHaveMeasures}, () => this.setState({showFirstInitLoader: false}))
                } else {
                    this.setState({showFirstInitLoader: false})
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout());
    }

    handleChangeSearchQuery = e => this.setState({
        initStationsWithMeasuresLoader: false,
        showStationsWithMeasuresPerCategory: false,
        stationsWithMeasuresPerCategory: [],
        selectedCategory: null,
        startDate: null,
        endDate: null,
        searchQuery: e.target.value
    })

    handleRenderCategoryMeasures = (category_id, stations) => {
        this.setState({
            initStationsWithMeasuresLoader: true,
            showStationsWithMeasuresPerCategory: false,
            stationsWithMeasuresPerCategory: [],
            selectedCategory: null,
            startDate: null,
            endDate: null
        })
        axios.post('/api/auth/measures/category/stations', {category_id, stations})
            .then(response => {
                if(response.data.length){
                    let stationsWithMeasuresPerCategory = [];

                    response.data.forEach(data => {
                        let {station_id, measures} = data;
                        measures = measures.map(measure => ({...measure, value: examineValue(measure.value)}));
                        let obj={station_id, measures};
                        stationsWithMeasuresPerCategory.push(obj);
                    })
                    this.setState({
                        stationsWithMeasuresPerCategory,
                        selectedCategory: category_id,
                        showStationsWithMeasuresPerCategory: true,
                        initStationsWithMeasuresLoader: false
                    })
                } else {
                    this.setState({
                        initStationsWithMeasuresLoader: false
                    })
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout());
    }

    handleChangeDateStart = date => {
        if(!date) {
            this.setState({startDate: null, endDate: null})
        } else {
            this.state.endDate && this.state.endDate < date ?
                this.setState({startDate: this.state.endDate})
                :
                this.setState({startDate: date})
        }
    }
    handleChangeDateEnd = date => {
        if(!this.state.startDate){
            this.setState({endDate: null})
        } else {
            date && date < this.state.startDate ?
                this.setState({endDate: this.state.startDate})
                :
                this.setState({endDate: date})
        }
    }


    render(){

        //***** DESTRUCT
        let {myStationsWithCollections, categories} = this.props;

        //CHECK FOR USER'S STATION'S NAMES
        let stationsWithCollections = checkUpdatesOnUserStations(this.state.stationsWithCollections, myStationsWithCollections);
        //***** FIRST GRAPH FOR MIN/MAX MEASURES PER CATEGORY RENDER
        let graphMinMaxMeasuresPerCategory = (
            <GraphMinMax
                minMaxMeasuresPerCategory={this.state.minMaxMeasuresPerCategory}
                categories={categories}
                stationsWithCollections={stationsWithCollections}
            />
        );

        //*****CREATING SELECTED CATEGORIES FROM RESPONSE AND FILTERING
        let selectedCategories = returnCategoriesArrayFromCategoriesIdsArray(this.state.categoriesThatHaveMeasures, categories);
        let filteredCategoriesThatHaveMeasures = filterSearchCategoriesOnGraphs(selectedCategories, this.state.searchQuery);
        //***** FILTERED CATEGORIES RENDER
        let categoriesWithMeasuresRender = (
            <CategoriesWithMeasuresRender
                searchQuery={this.state.searchQuery}
                onChangeSearchQuery={this.handleChangeSearchQuery}
                filteredCategoriesThatHaveMeasures={filteredCategoriesThatHaveMeasures}
                onClickRenderCategoryMeasures={this.handleRenderCategoryMeasures}
            />
        );

        //***** FILTER FOR DATE ON STATIONS MEASURES PER CATEGORY
        let filteredStationsWithMeasuresPerCategory = filterDateOnStationsWithMeasures(this.state.stationsWithMeasuresPerCategory, this.state.startDate, this.state.endDate)
        //***** SECOND GRAPH FOR FILTERED STATIONS MEASURES PER CATEGORY
        let graphAllMeasuresFromStationsPerCategory = (
            <GraphAllStationsMeasuresSpecificCategory
                initStationsWithMeasuresLoader={this.state.initStationsWithMeasuresLoader}
                showStationsWithMeasuresPerCategory={this.state.showStationsWithMeasuresPerCategory}
                stationsWithMeasuresPerCategory={this.state.stationsWithMeasuresPerCategory}
                filteredStationsWithMeasuresPerCategory={filteredStationsWithMeasuresPerCategory}
                selectedCategory={this.state.selectedCategory}
                stationsWithCollections={stationsWithCollections}
                categories={categories}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onClickChangeDateStart={this.handleChangeDateStart}
                onClickChangeDateEnd={this.handleChangeDateEnd}

            />
        )


        return (
            <div className="content swipe-up-content">
                {this.state.showFirstInitLoader ?
                    <WaitingLoader/>
                    :
                    stationsWithCollections.length &&
                    this.state.minMaxMeasuresPerCategory.length &&
                    this.state.categoriesThatHaveMeasures.length ?
                        <React.Fragment>
                            <div className="row">
                                <div className="offset-xl-1 col-xl-10">
                                    {graphMinMaxMeasuresPerCategory}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-4 mb-lg-5">
                                    {categoriesWithMeasuresRender}
                                </div>
                                <div className="col-sm-8">
                                    {graphAllMeasuresFromStationsPerCategory}
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        <NoMeasuresMessage header='Συγκρίσεις'/>
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

export default connect(mapStateToProps)(GraphsUser)
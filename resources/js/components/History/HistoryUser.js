import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import {MiniLoader} from "../General/MiniLoader";
import {notifyGeneralUpdatedList} from "../../general_functions/notifiers";
import {Scrollbars} from "react-custom-scrollbars";
import {notifyUnauthorizedActionAndLogout} from "../../general_functions/generalFunctions";

class HistoryUser extends React.Component {
    constructor(props){
        super(props);
        this.renderCollections = this.renderCollections.bind(this);
        this.renderMeasures = this.renderMeasures.bind(this);
        this.fetchAllStations = this.fetchAllStations.bind(this);
        this.clearStateFromBeginning = this.clearStateFromBeginning.bind(this);
        this.state = {
            showLoader: true,
            initCollectionLoader: false,
            initMeasuresLoader: false,
            showStationsWithColls: false,
            stationsWithColls: [],
            showCollections: false,
            collections: [],
            showMeasures: false,
            measures: []
        }
    }
    componentDidMount(){
        let renderHappened = false;
        this.fetchAllStations();
        window.Echo.channel('station').listen('deletedUserAndStationsWhileOnMeasures', e => {
            this.state.stationsWithColls.forEach((station)=>{
                if(e.stations.includes(station.id)){
                    renderHappened = true;
                    this.clearStateFromBeginning();
                }
            })
            if(renderHappened){
                notifyGeneralUpdatedList();
                renderHappened=false;
            }
        })
        window.Echo.channel('station').listen('needForRender', () => {
            renderHappened = true;
            this.clearStateFromBeginning();
            if(renderHappened){
                notifyGeneralUpdatedList();
                renderHappened=false;
            }
        })
        window.Echo.channel('station').listen('determineOwnership', e => {
            if(e.station.user_id === this.props.profile.id && this.props.myCollections.filter(collection=>e.station.id === collection.station_id).length > 0){
                renderHappened = true;
                this.clearStateFromBeginning();
                if (renderHappened) {
                    notifyGeneralUpdatedList();
                    renderHappened = false;
                }
            }
        })
        window.Echo.channel('station').listen('userForcedDeleteOwnStationRenderWhileOnHistory', e => {
            if(e.user.id === this.props.profile.id) {
                this.clearStateFromBeginning();
            }
        })
    }
    clearStateFromBeginning(){
        this.setState({showLoader: true,
            initCollectionLoader: false,
            initMeasuresLoader: false,
            showStationsWithColls: false,
            stationsWithColls: [],
            showCollections: false,
            collections: [],
            showMeasures: false,
            measures: []}, ()=>{
            this.fetchAllStations();
        })
    }
    fetchAllStations(){
        axios('/api/auth/collections/stations')
            .then((response)=>{
                if(response.data.length > 0){
                    let stationsWithColls=[];
                    response.data.forEach((station)=>{
                        let [id, name] = station;
                        stationsWithColls.push({id, name});
                    })
                    this.setState({showStationsWithColls: true, stationsWithColls, showLoader: false})
                } else {
                    this.setState({showLoader: false})
                }
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
    }
    renderCollections(name){
        this.setState({initCollectionLoader: true, showCollections: false, collections: [], showMeasures: false, measures: []})
        axios(`/api/auth/stations/${name}/collections`)
            .then((response)=>{
                let collections=[];
                response.data.forEach((data)=>{
                    let [id, series_hash, created_at, station_name, station_id] = data;
                    collections.push({
                        id,
                        series_hash,
                        created_at: created_at.date,
                        station_name,
                        station_id
                    })
                })
                this.setState({showCollections: true, collections, initCollectionLoader: false})
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
    }
    renderMeasures(e){
        this.setState({initMeasuresLoader: true, showMeasures: false, measures: []})
        axios(`/api/auth/collections/${e}/otherAndUser`).then((response)=>{
            let measures=[];
            response.data.forEach((measure)=>{
                measures.push({
                    category_id: measure.category_id,
                    category: this.props.categories.find((category)=>category.id === measure.category_id).name,
                    symbol: this.props.categories.find((category)=>category.id === measure.category_id).symbol,
                    value: measure.value
                })
            })
            this.setState({showMeasures: true, measures, initMeasuresLoader: false});
            // listen on category edited
            window.Echo.channel('category').listen('categoryEditedWhileOnMeasures', e => {
                if(this.state.measures){
                    if(this.state.measures.find((measure)=>measure.category_id === e.category.id)){
                        this.setState((prev)=>{
                            return {
                                measures: prev.measures.map((measure)=>{
                                    if(measure.category_id === e.category.id){
                                        return {...measure, category: e.category.name, symbol: e.category.symbol }
                                    } else {
                                        return measure
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
            .catch(e => notifyUnauthorizedActionAndLogout())
    }
    componentWillUnmount(){
        window.Echo.channel('category').stopListening('categoryEditedWhileOnMeasures');
        window.Echo.channel('station').stopListening('deletedUserAndStationsWhileOnMeasures');
        window.Echo.channel('station').stopListening('needForRender');
        window.Echo.channel('station').stopListening('determineOwnership');
        window.Echo.channel('station').stopListening('userForcedDeleteOwnStationRenderWhileOnHistory');
    }
    render(){
        return (
            <div className="content">
                <div>
                    <div className='pb-3'>
                        <h5 className="card-title text-center">Ιστορικό</h5>
                    </div>
                    <h5 className="card-title text-center">Επιλέξτε σταθμό για να δείτε όλο το ιστορικό των μετρήσεων.</h5>
                    <hr/>
                </div>
                {this.state.showLoader ?
                    <div>
                        <MiniLoader/>
                    </div>
                :
                    this.state.showStationsWithColls && this.state.stationsWithColls.length > 0 ?
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                        <h4 className="text-center">Σταθμοί</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Αναζητήστε τον σταθμό" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-light text-info " id="basic-addon2"><i className="fas fa-search ml-2"/></span>
                                            </div>
                                        </div>
                                        <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                            <div>
                                                {this.state.stationsWithColls.map((station)=> {
                                                    return <div key={station.id}
                                                              onClick={() => this.renderCollections(station.name)}
                                                                className="make-border point">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5>
                                                                {this.props.myStations.find((myStation)=>myStation.name === station.name) ?
                                                                    this.props.myStations.find((myStation)=>myStation.name === station.name).is_active ?
                                                                        <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                                    :
                                                                        <i className="mr-2 text-danger fas fa-broadcast-tower"/>
                                                                :
                                                                    <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                                }
                                                                {station.name}
                                                            </h5>
                                                            {this.props.myStations.find((myStation)=>myStation.name === station.name) &&
                                                            <small>{moment(this.props.myStations.find((myStation)=>myStation.name === station.name).created_at).format('ddd D MMM YY, h:mm:ss a')}</small>
                                                            }
                                                        </div>
                                                        <p>Στοιχεία σταθμού:
                                                            {this.props.myStations.find((myStation)=>myStation.name === station.name) ?
                                                                this.props.myStations.find((myStation)=>myStation.name === station.name).is_active ?
                                                                    <span className='text-success station mx-1'>Ενεργός</span>
                                                                :
                                                                    <span className='text-danger station mx-1'>Ανενεργός</span>
                                                            :
                                                                <span className='text-success station mx-1'>Ενεργός</span>
                                                            }
                                                            {this.props.myStations.find((myStation)=>myStation.name === station.name) ?
                                                                this.props.myStations.find((myStation)=>myStation.name === station.name).privacy === 'public' ?
                                                                    <span className='text-primary station mx-1'>Δημόσιος</span>
                                                                :
                                                                    <span className='text-primary station mx-1'>Ιδιωτικός</span>
                                                            :
                                                                <span className='text-primary station mx-1'>Δημόσιος</span>
                                                            }
                                                        </p>
                                                    </div>
                                                })}
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card">
                                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                        <h4 className="text-center">Σειρές μετρήσεων</h4>
                                    </div>
                                    <div className="card-body">
                                        {this.state.initCollectionLoader ?
                                            <MiniLoader/>
                                        :
                                            this.state.showCollections &&
                                                (this.state.collections.length > 0 ?
                                                    <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                                        <div>
                                                            {this.state.collections.map((collection)=>{
                                                                return <div key={collection.id} onClick={()=>this.renderMeasures(collection.series_hash)} className="make-border point">
                                                                    <p className='text-right'><small>{moment(collection.created_at).format('ddd D MMM YY, h:mm:ss a')}</small></p>
                                                                    <div className="d-flex w-100 justify-content-between">
                                                                        <h6>Κωδικός σειράς μετρήσεων: <p className='text-secondary'>{collection.series_hash}</p>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </Scrollbars>
                                                :
                                                    <h6 className='text-danger text-center mt-0'>Δεν υπάρχουν σειρές μετρήσεων στον σταθμό</h6>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                        <h4 className="text-center">Μετρήσεις</h4>
                                    </div>
                                    <hr/>
                                    <div className="card-body">
                                        {this.state.initMeasuresLoader ?
                                            <MiniLoader/>
                                        :
                                            this.state.showMeasures &&
                                            (
                                                this.state.measures.length > 0 ?
                                                    <div className='row'>
                                                    {this.state.measures.map((measure)=> {
                                                        return <div key={measure.category} className="col-md-4">
                                                            <div className="card card-stats bg-light">
                                                                <div className="card-body ">
                                                                    <div className="row">
                                                                        <div className="col-5 col-md-4">
                                                                            <div className="icon-big text-center icon-warning">
                                                                                <i className="fa fa-list-alt"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-7 col-md-8">
                                                                            <div className="numbers">
                                                                                <p className="card-category">{measure.category}</p>
                                                                                <p className="card-title">{measure.value} {measure.symbol}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-footer "><hr/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                    }
                                                </div>
                                                :
                                                    <h5 className='text-danger text-center mt-0'>Δεν υπάρχουν μετρήσεις στην συγκεκριμένη σειρά.</h5>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                        <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν μετρήσεις</h4>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        profile: state.user,
        categories: state.categories,
        myCollections: state.collections,
        myStations: state.stations
    }
};

export default connect(mapStateToProps)(HistoryUser)
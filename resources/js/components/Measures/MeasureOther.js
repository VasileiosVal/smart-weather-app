import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import {Scrollbars} from "react-custom-scrollbars";
import {notifyGeneralUpdatedList} from "../../general_functions/notifiers";
import {MiniLoader} from "../General/MiniLoader";
import {notifyUnauthorizedActionAndLogout} from "../../general_functions/generalFunctions";

class MeasureOther extends React.Component {
    constructor(props){
        super(props);
        this.renderMeasures = this.renderMeasures.bind(this);
        this.fetchCollections = this.fetchCollections.bind(this);
        this.state = {
            collections: [],
            showCollections: false,
            measures: [],
            showMeasures: false,
            fetchStartLoader: true,
            initLoader: false
        }
    }
    componentDidMount(){
        let renderHappened = false;
        this.fetchCollections();
        window.Echo.channel('station').listen('deletedUserAndStationsWhileOnMeasures', e => {
            this.state.collections.forEach((collection)=>{
                if(e.stations.includes(collection.station_id)){
                    renderHappened = true;
                    this.setState({collections: [], showCollections:false, fetchStartLoader: true, measures:[], showMeasures:false, initLoader: false}, ()=>{
                        this.fetchCollections();
                    })
                }
            })
            if(renderHappened){
                notifyGeneralUpdatedList();
                renderHappened=false;
            }
        })
        window.Echo.channel('station').listen('needForRender', () => {
            renderHappened = true;
            this.setState({collections: [], showCollections:false, fetchStartLoader: true, measures:[], showMeasures:false, initLoader: false}, ()=>{                this.fetchCollections();
            })
            if(renderHappened){
                notifyGeneralUpdatedList();
                renderHappened=false;
            }
        })
        window.Echo.channel('station').listen('determineOwnership', e => {
        if(e.station.user_id === this.props.profile.id && this.state.collections.find(collection=>collection.station_id === e.station.id)){
            renderHappened = true;
            this.setState({collections: [], showCollections:false, fetchStartLoader: true, measures:[], showMeasures:false, initLoader: false}, ()=>{                this.fetchCollections();
            })
            if (renderHappened) {
                notifyGeneralUpdatedList();
                renderHappened = false;
            }
        }
        })
        window.Echo.channel('station').listen('userForcedDeleteOwnStationRenderWhileOnMeasures', e => {
            if(e.user.id === this.props.profile.id){
                this.setState({collections: [], showCollections:false, fetchStartLoader: true, measures:[], showMeasures:false, initLoader: false}, ()=>{                    this.fetchCollections();
                })
            }
        })
    }
    fetchCollections(){
        axios('/api/auth/collections/other')
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
                this.setState({collections, showCollections:true, fetchStartLoader:false})
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
    }
    renderMeasures(e){
        this.setState({initLoader: true, measures: [], showMeasures: false});
        axios(`/api/auth/collections/${e}/other`)
            .then((response)=>{
                let measures=[];
                response.data.forEach((measure)=>{
                    measures.push({
                        category_id: measure.category_id,
                        category: this.props.categories.find((category)=>category.id === measure.category_id).name,
                        symbol: this.props.categories.find((category)=>category.id === measure.category_id).symbol,
                        value: measure.value
                    })
                })
                this.setState({measures, showMeasures:true, initLoader: false});
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
        window.Echo.channel('station').stopListening('userForcedDeleteOwnStationRenderWhileOnMeasures');
    }
    render() {
        return (
            <div className="content">
                <div>
                    <div className='pb-3'>
                        <h5 className="card-title text-center">Μετρήσεις</h5>
                    </div>
                    <h5 className="card-title text-center">Επιλέξτε ανάμεσα απο την λίστα των ενεργών-δημόσιων σταθμών άλλων χρηστών για να δείτε την πιο πρόσφατη σειρά μετρήσεων.</h5>
                    <hr/>
                </div>
                {this.state.fetchStartLoader ?
                    <div>
                        <MiniLoader/>
                    </div>
                :
                    this.state.showCollections && this.state.collections.length > 0 ?
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                        <h4 className="text-center">Σταθμοί</h4>
                                    </div>
                                    <div className="card-body">
                                        <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                            <div>
                                                {this.state.collections.map((collection)=>{
                                                    return <div key={collection.id} onClick={()=>this.renderMeasures(collection.series_hash)} className="make-border point">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5><i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                                    {collection.station_name}
                                                                </h5>
                                                                <small>{moment(collection.created_at).format('ddd D MMM YY, h:mm:ss a')}</small>
                                                            </div>
                                                            <p>Στοιχεία σταθμού:
                                                                <span className='text-success station mx-1'>Ενεργός</span>
                                                                <span className='text-primary station mx-1'>Δημόσιος</span>
                                                            </p>
                                                            <p>Κωδικός σειράς μετρήσεων: <small className='text-secondary'>{collection.series_hash}</small></p>
                                                        </div>
                                                })}
                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="card">
                                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                        <h4 className="text-center">Μετρήσεις</h4>
                                    </div>
                                    <hr/>
                                    <div className="card-body">
                                        {this.state.initLoader ?
                                            <MiniLoader/>
                                        :
                                            this.state.showMeasures &&
                                            (
                                                this.state.measures.length > 0 ?
                                                    <div className='row'>
                                                    {this.state.measures.map((measure)=> {
                                                        return <div key={measure.category_id} className="col-md-4">
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
        categories: state.categories
    }
};

export default connect(mapStateToProps)(MeasureOther)
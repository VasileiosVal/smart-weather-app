import React from 'react';
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from "moment/moment";
import {MiniLoader} from "../General/MiniLoader";
import {notifyUnauthorizedActionAndLogout} from "../../general_functions/generalFunctions";


class MeasureAll extends React.Component {
    constructor(props){
        super(props);
        this.renderMeasures = this.renderMeasures.bind(this);
        this.state = {
            showLoader: false,
            showMeasures: false,
            measures: []
        }
    }
    renderMeasures(hash){
        this.setState({showLoader: true, showMeasures: false, measures: []});
        axios(`/api/auth/collections/${hash}/admin`)
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
                this.setState({measures, showLoader: false, showMeasures:true});
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
                window.Echo.channel('collection').listen('newCollectionWithMeasuresCreatedListenEveryone', e => {
                    let collection = this.props.collections.find(collection=>collection.series_hash === hash);
                    if(this.state.measures && collection.station_id === e.collection.station_id){
                        this.renderMeasures(e.collection.series_hash)
                    }
                })
            })
            .catch(e => notifyUnauthorizedActionAndLogout())
    }
    componentDidUpdate(prevProps){
        if(this.props.newestCollections.length < prevProps.newestCollections.length){
            this.setState({showLoader: false, measures:[], showMeasures:false})
        }
    }
    componentWillUnmount(){
        window.Echo.channel('category').stopListening('categoryEditedWhileOnMeasures');
        window.Echo.channel('collection').stopListening('newCollectionWithMeasuresCreatedListenEveryone');
    }
    render(){
        return (
            <div className="content">
                <div>
                    <div className='pb-3'>
                        <h5 className="card-title text-center">Μετρήσεις</h5>
                    </div>
                    <h5 className="card-title text-center">Επιλέξτε σταθμό για να δείτε την πιο πρόσφατη σειρά μετρήσεων.</h5>
                    <hr/>
                </div>
                {this.props.newestCollections.length > 0 ?
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                    <h4 className="text-center">Σταθμοί</h4>
                                </div>
                                <div className="card-body">
                                    <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                        <div>
                                            {this.props.newestCollections.map((collection)=>{
                                                return <div key={collection.id} onClick={()=>this.renderMeasures(collection.series_hash)} className="make-border point">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5>{this.props.stations.find((station)=>station.id === collection.station_id).is_active ?
                                                                    <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                                    :
                                                                    <i className="mr-2 text-danger fas fa-broadcast-tower"/>
                                                                    }
                                                                    {this.props.stations.find((station)=>station.id === collection.station_id).name}
                                                                </h5>
                                                                <small>{moment(collection.created_at).format('ddd D MMM YY, h:mm:ss a')}</small>
                                                            </div>
                                                            <p>Στοιχεία σταθμού:
                                                            {this.props.stations.find((station)=>station.id === collection.station_id).is_active ?
                                                                <span className='text-success station mx-1'>Ενεργός</span>
                                                                :
                                                                <span className='text-danger station mx-1'>Ανενεργός</span>
                                                            }
                                                            {this.props.stations.find((station)=>station.id === collection.station_id).privacy === 'public' ?
                                                                <span className='text-primary station mx-1'>Δημόσιος</span>
                                                                :
                                                                <span className='text-primary station mx-1'>Ιδιωτικός</span>
                                                            }
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
                                    {this.state.showLoader ?
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
    let arr=[];
    state.stations.forEach((station)=>{
        let colls = state.collections.filter((collection)=>collection.station_id === station.id);
        if(colls.length > 0){
            arr.push(colls.pop())
        }
    });
    return {
        newestCollections: arr,
        collections: state.collections,
        stations: state.stations,
        categories: state.categories
    }
};

export default connect(mapStateToProps)(MeasureAll)
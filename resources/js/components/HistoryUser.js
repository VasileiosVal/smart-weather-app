import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import {MiniLoader} from "./MiniLoader";
import {startLogoutUser} from "../actions/Auth";
import {notifyUnauthorizedAction} from "../general_functions/notifiers";
import {Scrollbars} from "react-custom-scrollbars";

class HistoryUser extends React.Component {
    constructor(props){
        super(props);
        this.renderCollections = this.renderCollections.bind(this);
        this.renderMeasures = this.renderMeasures.bind(this);
        this.state = {
            showLoader: true,
            initCollectionLoader: false,
            initMeasuresLoader: false,
            stationsWithColls: false,
            collections: false,
            measures: false
        }
    }
    componentDidMount(){
        axios('/api/auth/collections/stations')
            .then((response)=>{
                if(response.data.length > 0){
                    let stationsWithColls=[];
                    response.data.forEach(($data)=>{
                        let [name, arrayOfCollections] = $data;
                        let collections=[];
                        arrayOfCollections.forEach((collection)=>{
                            let [hash, created_at] = collection;
                            collections.push({
                                series_hash: hash,
                                created_at: created_at.date
                            })
                        });
                        stationsWithColls.push({name, collections})
                    })
                    this.setState({stationsWithColls, showLoader: false})
                } else {
                    this.setState({showLoader: false})
                }
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
    renderCollections(name){
        this.setState({initCollectionLoader: true, measures: false})
        let selectedStationCollections = this.state.stationsWithColls.find((station)=>station.name === name).collections;
        this.setState({collections: selectedStationCollections, initCollectionLoader: false})
    }
    renderMeasures(e){
        this.setState({initMeasuresLoader: true, measures:false})
        axios(`/api/auth/collections/${e}/otherAndUser`).then((response)=>{
            let measures=[];
            response.data.forEach((measure)=>{
                measures.push({
                    category: this.props.categories.find((category)=>category.id === measure.category_id).name,
                    symbol: this.props.categories.find((category)=>category.id === measure.category_id).symbol,
                    value: measure.value
                })
            })
            this.setState({measures, initMeasuresLoader: false})
        })
            .catch(()=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }

    render(){
        return (
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Μετρήσεις</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                    <h5 className="card-title text-center">Επιλέξτε σταθμό για να δείτε όλο το ιστορικό των μετρήσεων.</h5>
                    <hr/>
                </div>
                {this.state.showLoader ?
                    <div>
                        <MiniLoader/>
                    </div>
                    :
                    this.state.stationsWithColls && this.state.stationsWithColls.length > 0 ?
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
                                            <div className="list-group">
                                                {this.state.stationsWithColls.map((station)=> {
                                                    return <a key={station.name}
                                                              onClick={() => this.renderCollections(station.name)}
                                                              className="list-group-item list-group-item-action flex-column align-items-start point">
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
                                                            <small>Δημιουργία: {moment(this.props.myStations.find((myStation)=>myStation.name === station.name).created_at).fromNow()}</small>
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
                                                    </a>
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
                                            this.state.collections &&
                                            <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                                <div className="list-group">
                                                    {this.state.collections.map((collection)=>{
                                                        return <a key={collection.series_hash} onClick={()=>this.renderMeasures(collection.series_hash)} className="list-group-item list-group-item-action flex-column align-items-start point">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h6>Κωδικός σειράς μετρήσεων: <p className='text-secondary'>{collection.series_hash}</p>
                                                                </h6>
                                                                <small>{moment(collection.created_at).fromNow()}</small>
                                                            </div>
                                                        </a>
                                                    })}
                                                </div>
                                            </Scrollbars>
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
                                            this.state.measures &&
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
                                                            <div className="card-footer ">
                                                                <hr/>
                                                                <div className="stats">
                                                                    <i className="fa fa-refresh"></i> Update Now
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                                }
                                            </div>
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
        categories: state.categories,
        myCollections: state.collections,
        myStations: state.stations
    }
};

export default connect(mapStateToProps)(HistoryUser)
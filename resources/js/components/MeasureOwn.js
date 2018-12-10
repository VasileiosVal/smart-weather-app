import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import {Scrollbars} from "react-custom-scrollbars";
import {MiniLoader} from "./MiniLoader";
import {notifyUnauthorizedAction} from "../general_functions/notifiers";
import {startLogoutUser} from "../actions/Auth";

class MeasureOwn extends React.Component {
    constructor(props){
        super(props);
        this.renderMeasures = this.renderMeasures.bind(this);
        this.state = {
            showLoader: false,
            measures: false
        }
    }
    renderMeasures(e){
        this.setState({showLoader: true, measures: false})
        axios(`/api/auth/collections/${e}`)
            .then((response)=>{
                let measures=[];
                response.data.forEach((measure)=>{
                    measures.push({
                    category: this.props.categories.find((category)=>category.id === measure.category_id).name,
                    symbol: this.props.categories.find((category)=>category.id === measure.category_id).symbol,
                    value: measure.value
                    })
                })
                this.setState({measures, showLoader: false})
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
                    <h5 className="card-title text-center">Επιλέξτε ανάμεσα απο την λίστα των σταθμών σας για να δείτε την πιο πρόσφατη σειρά μετρήσεων.</h5>
                    <hr/>
                </div>
                {this.props.newestCollections.length > 0 ?
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                    <h4 className="text-center">Οι σταθμοί μου</h4>
                                </div>
                                <div className="card-body">
                                    <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                        <div className="list-group">
                                            {this.props.newestCollections.map((collection)=>{
                                                return <a key={collection.id} onClick={()=>this.renderMeasures(collection.series_hash)} className="list-group-item list-group-item-action flex-column align-items-start point">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5>{this.props.stations.find((station) => station.id === collection.station_id).is_active ?
                                                                <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                                :
                                                                <i className="mr-2 text-danger fas fa-broadcast-tower"/>
                                                            }
                                                                {this.props.stations.find((station)=>station.id === collection.station_id).name}
                                                            </h5>
                                                            <small>{moment(collection.created_at).fromNow()}</small>
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
                                                    </a>
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
    let arr=[];
    state.stations.forEach((station)=>{
        let colls = state.collections.filter((collection)=>collection.station_id === station.id);
        if(colls.length > 0){
            arr.push(colls.pop())
        }
    });
    return {
        newestCollections: arr,
        categories: state.categories,
        stations: state.stations
    }
};

export default connect(mapStateToProps)(MeasureOwn)
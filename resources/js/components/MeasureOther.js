import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import {Scrollbars} from "react-custom-scrollbars";
import {notifyUnauthorizedAction} from "../general_functions/notifiers";
import {startLogoutUser} from "../actions/Auth";
import {MiniLoader} from "./MiniLoader";

class MeasureOther extends React.Component {
    constructor(props){
        super(props);
        this.renderMeasures = this.renderMeasures.bind(this);
        this.state = {
            collections: false,
            measures: false,
            fetchLoader: true,
            initLoader: false
        }
    }
    componentDidMount(){
        axios('/api/auth/collections/other')
            .then((response)=>{
                let collections=[];
                response.data.forEach((data)=>{
                    let [name, series_hash, created_at] = data;
                    collections.push({
                        name,
                        series_hash,
                        created_at: created_at.date
                    })
                })
                this.setState({collections, fetchLoader:false})
            })
            .catch((e)=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
    renderMeasures(e){
        this.setState({initLoader: true, measures: false})
        axios(`/api/auth/collections/${e}/other`)
            .then((response)=>{
                let measures=[];
                response.data.forEach((measure)=>{
                    measures.push({
                        category: this.props.categories.find((category)=>category.id === measure.category_id).name,
                        symbol: this.props.categories.find((category)=>category.id === measure.category_id).symbol,
                        value: measure.value
                    })
                })
                this.setState({measures, initLoader: false})
            })
            .catch(()=>{
                notifyUnauthorizedAction();
                setTimeout(()=>{startLogoutUser()}, 1500);
            })
    }
    render() {
        return (
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Μετρήσεις</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                    <h5 className="card-title text-center">Επιλέξτε ανάμεσα απο την λίστα των ενεργών-δημόσιων σταθμών άλλων χρηστών για να δείτε την πιο πρόσφατη σειρά μετρήσεων.</h5>
                    <hr/>
                </div>
                {this.state.fetchLoader ?
                    <div>
                        <MiniLoader/>
                    </div>
                    :
                    this.state.collections && this.state.collections.length > 0 ?
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                                        <h4 className="text-center">Σταθμοί</h4>
                                    </div>
                                    <div className="card-body">
                                        <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                            <div className="list-group">
                                                {this.state.collections.map((collection)=>{
                                                    return <a key={collection.series_hash} onClick={()=>this.renderMeasures(collection.series_hash)} className="list-group-item list-group-item-action flex-column align-items-start point">
                                                        <div className="d-flex w-100 justify-content-between">
                                                            <h5><i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                                {collection.name}
                                                            </h5>
                                                            <small>{moment(collection.created_at).fromNow()}</small>
                                                        </div>
                                                        <p>Στοιχεία σταθμού:
                                                            <span className='text-success station mx-1'>Ενεργός</span>
                                                            <span className='text-primary station mx-1'>Δημόσιος</span>
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
                                        {this.state.initLoader ?
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
        categories: state.categories
    }
};

export default connect(mapStateToProps)(MeasureOther)
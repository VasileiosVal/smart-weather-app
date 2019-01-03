import React from 'react';
import {connect} from 'react-redux';
import moment from "moment/moment";
import {Scrollbars} from "react-custom-scrollbars";
import {MiniLoader} from "../General/MiniLoader";
import {findStationsWithCollections, notifyUnauthorizedActionAndLogout} from "../../general_functions/generalFunctions";
import {CardBelowHeaderTitle} from "../../containers/generalContainers";

class HistoryAdmin extends React.Component {
    state = {
        initCollectionLoader: false,
        initMeasuresLoader: false,
        collections: [],
        showCollections: false,
        measures: [],
        showMeasures: false
    }
    renderCollections(id){
        this.setState({showCollections: false, collections: [], showMeasures: false, measures: [], initCollectionLoader: true, initMeasuresLoader: false}, ()=>{
            let collections = this.props.collections.filter((collection)=>collection.station_id === id)
            this.setState({collections, showCollections: true, initCollectionLoader: false})
        })
    }
    renderMeasures(hash){
        this.setState({showMeasures: false, measures: [], initMeasuresLoader: true})
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
    componentDidUpdate(prevProps){
        if(this.props.stationsWithCollections.length < prevProps.stationsWithCollections.length){
            this.setState({
                initCollectionLoader: false,
                initMeasuresLoader: false,
                collections: [],
                showCollections: false,
                measures: [],
                showMeasures: false
            })
        }
    }
    componentWillUnmount(){
        window.Echo.channel('category').stopListening('categoryEditedWhileOnMeasures')
    }
    render(){
        return (
            <div className="content">
                <h5 className="card-title text-center">Μετρήσεις</h5><hr/>
                {this.props.stationsWithCollections.length ?
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <CardBelowHeaderTitle name='Σταθμοί'/>
                                <p className='text-center'><label>Επιλέξτε σταθμό απο την παρακάτω λίστα για να εμφανιστούν οι συλλογές μετρήσεων του</label></p>
                                <div className="card-body py-0">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Αναζητήστε τον σταθμό" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text bg-light text-info " id="basic-addon2"><i className="fas fa-search ml-2"/></span>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">

                                        </div>
                                    </div>
                                    <Scrollbars autoHeight autoHeightMin={200} autoHeightMax={400}>
                                        <div>
                                            {this.props.stationsWithCollections.map((station)=> {
                                                return <div key={station.id}
                                                          onClick={() => this.renderCollections(station.id)}
                                                          className="make-border point">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5>{station.is_active ?
                                                            <i className="mr-2 text-success fas fa-broadcast-tower"/>
                                                            :
                                                            <i className="mr-2 text-danger fas fa-broadcast-tower"/>
                                                        }
                                                            {station.name}
                                                        </h5>
                                                        <small>{moment(station.created_at).format('ddd D MMM YY, h:mm:ss a')}</small>
                                                    </div>
                                                    <p>Στοιχεία σταθμού:
                                                        {station.is_active ?
                                                            <span className='text-success station mx-1'>Ενεργός</span>
                                                            :
                                                            <span className='text-danger station mx-1'>Ανενεργός</span>
                                                        }
                                                        {station.privacy === 'public' ?
                                                            <span className='text-primary station mx-1'>Δημόσιος</span>
                                                            :
                                                            <span className='text-primary station mx-1'>Ιδιωτικός</span>
                                                        }
                                                    </p>
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

                    </div>
                :
                    <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν μετρήσεις</h4>
                }
            </div>
        );
    }
};

const mapStateToProps = state => {
    let stations = state.stations;
    let collections = state.collections;
    let categories = state.categories;
    let stationsWithCollections = collections.length && findStationsWithCollections(stations, collections);

    return {
        stationsWithCollections,
        stations,
        collections,
        categories
    }
};

export default connect(mapStateToProps)(HistoryAdmin)


// <div className="col-sm-6">
//     <div className="card">
//     <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
//     <h4 className="text-center">Μετρήσεις</h4>
// </div>
// <hr/>
// <div className="card-body">
//     {this.state.initMeasuresLoader ?
//         <MiniLoader/>
//         :
//         this.state.showMeasures &&
//         (
//             this.state.measures.length > 0 ?
//                 <div className='row'>
//                     {this.state.measures.map((measure)=> {
//                         return <div key={measure.category_id} className="col-md-4">
//                             <div className="card card-stats bg-light">
//                                 <div className="card-body ">
//                                     <div className="row">
//                                         <div className="col-5 col-md-4">
//                                             <div className="icon-big text-center icon-warning">
//                                                 <i className="fa fa-list-alt"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-7 col-md-8">
//                                             <div className="numbers">
//                                                 <p className="card-category">{measure.category}</p>
//                                                 <p className="card-title">{measure.value} {measure.symbol}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="card-footer "><hr/>
//                                 </div>
//                             </div>
//                         </div>
//                     })
//                     }
//                 </div>
//                 :
//                 <h5 className='text-danger text-center mt-0'>Δεν υπάρχουν μετρήσεις στην συγκεκριμένη σειρά.</h5>
//         )
//     }
// </div>
// </div>
// </div>
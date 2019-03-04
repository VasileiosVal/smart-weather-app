import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

let DashboardUser = ({stations, collections, categories}) => (
        <div className="content">
            <div className="row mt-2">
                <div className="col-10 offset-1">
                    <div className="card box-shadow">
                        <div className="card-header text-center">
                            <h5 className="card-title">Καλώς ήρθατε στο Smart Weather App</h5>
                        </div>
                        <hr className='style mt-2'/>
                        <div className="card-body animated fadeIn slow">
                            <div className='bottom-to-top'>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;Απο το μενού μπορείτε να πλοηγηθείτε στις επιμέρους ενότητες. Κάθε ενότητα αναλύεται παρακάτω.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Σταθμοί: </strong>Μπορείτε να δημιουργήσετε τους δικούς σας σταθμούς, επιλέγοντας απο την λίστα κατηγοριών, τα είδη των μετρήσεων που θα πραγματοποιεί ο σταθμός σας.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Κατηγορίες: </strong>Στην ενότητα αυτή παρουσιάζονται οι διαθέσιμες κατηγορίες μετρήσεων, όπου μπορείτε να διαλέξετε για τους σταθμούς σας.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Μετρήσεις: </strong>Παρακολουθήστε κάθε συλλογή μετρήσεων των σταθμών σας, καθώς και συλλογές απο τους δημόσιους/ενεργούς σταθμούς των άλλων χρηστών.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Συγκρίσεις: </strong>Παρακολουθήστε και συγκρίνετε ανά κατηγορία, τις μετρήσεις των σταθμών σας, καθώς και μετρήσεις σταθμών, άλλων χρηστών.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Ενημερώσεις: </strong>Ενημερωθείτε για κάθε ενέργεια των σταθμών σας, για κάθε καινούργια μέτρηση καθώς και ενημερώσεις απο τους διαχειριστές.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Προφίλ: </strong>Προβολή πληροφοριών του λογαριασμού σας, καθώς και δυνατότητα επεξεργασίας στοιχείων.</p>
                            </div>
                        </div>
                        <div className="card-footer"/>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats hidden animated bounceIn slower">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fas fa-broadcast-tower text-warning rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Οι Σταθμοί μου</p>
                                        <p className="card-title">{stations.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/stations'>Δείτε πληροφορίες</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats hidden animated bounceIn slower">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fa fa-edit text-danger rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Οι Κατηγορίες μου</p>
                                        <p className="card-title">{categories.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/categories'>Δείτε πληροφορίες</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats hidden animated bounceIn slower">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fas fa-chart-line text-info rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Οι Σειρές μετρήσεων μου</p>
                                        <p className="card-title">{collections.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link to='/measures' className='card-link'>Δείτε πληροφορίες</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

const mapStateToProps = state => ({
    stations: state.stations,
    collections: state.collections,
    categories: state.categories
});

export default connect(mapStateToProps)(DashboardUser)
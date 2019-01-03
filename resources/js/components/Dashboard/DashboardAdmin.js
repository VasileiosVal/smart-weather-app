import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

let DashboardAdmin = ({users, stations,categories, collections}) => {
    return (
        <div className="content">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="row">
                                <div className="col-5 col-md-4">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fa fa-users"/>
                                    </div>
                                </div>
                                <div className="col-7 col-md-8">
                                    <div className="numbers">
                                        <p className="card-category">Χρήστες</p>
                                        <p className="card-title">{users.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/users'>Δείτε πληροφορίες</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="row">
                                <div className="col-5 col-md-4">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fas fa-broadcast-tower"/>
                                    </div>
                                </div>
                                <div className="col-7 col-md-8">
                                    <div className="numbers">
                                        <p className="card-category">Σταθμοί</p>
                                        <p className="card-title">{stations.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/stations/all'>Δείτε πληροφορίες</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="row">
                                <div className="col-5 col-md-4">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fas fa-edit"/>
                                    </div>
                                </div>
                                <div className="col-7 col-md-8">
                                    <div className="numbers">
                                        <p className="card-category">Κατηγορίες</p>
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
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-body ">
                            <div className="row">
                                <div className="col-5 col-md-4">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="fas fa-folder-open"/>
                                    </div>
                                </div>
                                <div className="col-7 col-md-8">
                                    <div className="numbers">
                                        <p className="card-category">Σειρές μετρήσεων</p>
                                        <p className="card-title">{collections.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link to='/history' className='card-link'>Δείτε πληροφορίες</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card ">
                        <div className="card-header ">
                            <h5 className="card-title">Users Behavior</h5>
                            <p className="card-category">24 Hours performance</p>
                        </div>
                        <div className="card-body ">
                            {/*<canvas id=chartHours width="400" height="100"></canvas>*/}
                        </div>
                        <div className="card-footer ">
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-history"></i> Updated 3 minutes ago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card ">
                        <div className="card-header ">
                            <h5 className="card-title">Email Statistics</h5>
                            <p className="card-category">Last Campaign Performance</p>
                        </div>
                        <div className="card-body ">
                            {/*<canvas id="chartEmail"></canvas>*/}
                        </div>
                        <div className="card-footer ">
                            <div className="legend">
                                <i className="fa fa-circle text-primary"></i> Opened
                                <i className="fa fa-circle text-warning"></i> Read
                                <i className="fa fa-circle text-danger"></i> Deleted
                                <i className="fa fa-circle text-gray"></i> Unopened
                            </div>
                            <hr/>
                            <div className="stats">
                                <i className="fa fa-calendar"></i> Number of emails sent
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card card-chart">
                        <div className="card-header">
                            <h5 className="card-title">NASDAQ: AAPL</h5>
                            <p className="card-category">Line Chart with Points</p>
                        </div>
                        <div className="card-body">
                            {/*<canvas id="speedChart" width="400" height="100"></canvas>*/}
                        </div>
                        <div className="card-footer">
                            <div className="chart-legend">
                                <i className="fa fa-circle text-info"></i> Tesla Model S
                                <i className="fa fa-circle text-warning"></i> BMW 5 Series
                            </div>
                            <hr/>
                            <div className="card-stats">
                                <i className="fa fa-check"></i> Data information certified
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        stations: state.stations,
        collections: state.collections,
        categories: state.categories
    }
};

export default connect(mapStateToProps)(DashboardAdmin)
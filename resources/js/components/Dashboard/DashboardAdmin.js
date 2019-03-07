import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import moment from "moment";
import {DonutStationsChart, DonutUsersChart} from "../../containers/generalContainers";

let DashboardAdmin = ({users, stations, categories, collections}) => {

    let stationChart = (
        users.length && stations.length ?
            <DonutStationsChart
                stations={stations}
                users={users}
                collections={collections}
            />
        :
            <h5 className='text-center text-danger'>No data exist</h5>
    );

    let userChart = (
        !!users.length &&
            <DonutUsersChart
                users={users}
                height={250}
            />
    );

    return (
        <div className="content">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats hidden animated fadeIn fast">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fa fa-users text-success rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Users</p>
                                        <p className="card-title">{users.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/users'>Show information</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats hidden animated fadeIn fast">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fas fa-broadcast-tower text-warning rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Stations</p>
                                        <p className="card-title">{stations.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/stations/all'>Show information</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats hidden animated fadeIn fast">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fa fa-edit text-danger rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Categories</p>
                                        <p className="card-title">{categories.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/categories'>Show information</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats hidden animated fadeIn fast">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fas fa-chart-line text-info rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">Measurement collections</p>
                                        <p className="card-title">{collections.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link to='/measures' className='card-link'>Show information</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-7">
                    <div className="card animated bounceIn slower">
                        <div className="card-header ">
                            <h5 className="card-title">Stations information</h5>
                        </div>
                        <div className="card-body my-2">
                            {stationChart}
                        </div>
                        <div className="card-footer"/>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card animated fadeIn slow">
                        <div className="card-header ">
                            <h5 className="card-title">Notifications</h5>
                        </div>
                        <div className="card-body ">
                            <ul className="list-group">
                                <li className="list-group-item dashboard-notify-li d-flex justify-content-between align-items-center">
                                    <span><i className='fa fa-fw fa-university'/>&nbsp;New station</span>
                                    <label>{stations.length ? moment([...stations].pop().created_at).fromNow() : 'No data exist' }</label>
                                </li>
                                <li className="list-group-item dashboard-notify-li d-flex justify-content-between align-items-center">
                                    <span><i className='fa fa-user'/>&nbsp;New user</span>
                                    <label>{users.length ? moment([...users].pop().created_at).fromNow() : 'No data exist' }</label>
                                </li>
                                <li className="list-group-item dashboard-notify-li d-flex justify-content-between align-items-center">
                                    <span><i className='fa fa-fw fa-list'/>&nbsp;New category</span>
                                    <label>{categories.length ? moment([...categories].pop().created_at).fromNow() : 'No data exist' }</label>
                                </li>
                                <li className="list-group-item dashboard-notify-li d-flex justify-content-between align-items-center">
                                    <span><i className='fas fa-chart-line'/>&nbsp;New measurement collection</span>
                                    <label>{collections.length ? moment([...collections].pop().created_at).fromNow() : 'No data exist' }</label>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer "/>
                    </div>
                    <div className="card animated bounceIn slower">
                        <div className="card-header ">
                            <h5 className="card-title">Users information</h5>
                        </div>
                        <div className="card-body ">
                            {userChart}
                        </div>
                        <div className="card-footer "/>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
        users: state.users,
        stations: state.stations,
        collections: state.collections,
        categories: state.categories
});

export default connect(mapStateToProps)(DashboardAdmin)
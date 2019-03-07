import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

let DashboardUser = ({stations, collections, categories}) => (
        <div className="content">
            <div className="row mt-2">
                <div className="col-10 offset-1">
                    <div className="card box-shadow">
                        <div className="card-header text-center">
                            <h5 className="card-title">Welcome to SmartWeatherApp</h5>
                        </div>
                        <hr className='style mt-2'/>
                        <div className="card-body animated fadeIn slow">
                            <div className='bottom-to-top'>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;From the menu you can navigate to the individual sections. Each section is described below.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Stations: </strong>You can create your own stations by selecting from the list of categories the types of measurements your station will perform.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Categories: </strong>This section shows the available measurement categories, where you can choose for your stations.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Collections: </strong>Track each station's collections of measurements, as well as collections from the public / active stations of other users.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Comparisons: </strong>Track and compare by category, your stations measurements, and stations measurements, from other users.</p>
                                <p className='dashboard-notify-li pl-3 pr-2'><i className="fas fa-check"/>&ensp;<strong>Profile: </strong>View your account information as well as process your account data.</p>
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
                                        <p className="card-category">My stations</p>
                                        <p className="card-title">{stations.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer py-0">
                            <hr/>
                            <div className="stats">
                                <p><Link className='card-link' to='/stations'>Show information</Link></p>
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
                                        <p className="card-category">My categories</p>
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
                <div className="col-lg-4 col-sm-6">
                    <div className="card card-stats hidden animated bounceIn slower">
                        <div className="card-body">
                            <div className="row position-relative">
                                <i className="fas fa-chart-line text-info rotate-icon"/>
                                <div className="col-12">
                                    <div className="numbers">
                                        <p className="card-category">My measurements collections</p>
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
        </div>
    );

const mapStateToProps = state => ({
    stations: state.stations,
    collections: state.collections,
    categories: state.categories
});

export default connect(mapStateToProps)(DashboardUser)
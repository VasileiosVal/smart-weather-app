import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

let SidebarUI = ({isAdmin}) => (
        <div className="sidebar" data-color="orange" data-active-color="info">
            <div className="logo">
                <a className="simple-text logo-mini">
                    <div className="logo-image-small">
                        <i className="fas fa-globe-americas"/>
                    </div>
                </a>
                <Link to='/dashboard' className="simple-text simple-text-title">
                    SmartWeatherApp
                </Link>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li>
                        <Link to='/dashboard'>
                            <i className="fas fa-tachometer-alt"/>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <a id='collapse-link' data-toggle="collapse" href="#componentsExamples1">
                            <i className="fas fa-broadcast-tower"/>
                            <p>
                                Stations
                                <b className="caret"/>
                            </p>
                        </a>
                        <div className="collapse " id="componentsExamples1">
                            <ul>
                                <li className="nav-item ">
                                    <Link to='/stations'>
                                        <span className="sidebar-normal">My stations</span>
                                    </Link>
                                </li>
                                {isAdmin &&
                                <li className="nav-item">
                                    <Link to='/stations/all'>
                                        <span className="sidebar-normal">View all stations</span>
                                    </Link>
                                </li>
                                }
                                <li className="nav-item ">
                                    <Link to='/stations/create'>
                                        <span className="sidebar-normal">Station creation</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    {isAdmin &&
                    <li>
                        <a id='collapse-link' data-toggle="collapse" href="#componentsExamples2">
                            <i className="fa fa-users"/>
                            <p>
                                Users
                                <b className="caret"/>
                            </p>
                        </a>
                        <div className="collapse" id="componentsExamples2">
                            <ul>
                                <li className="nav-item ">
                                    <Link to='/users'>
                                        <span className="sidebar-normal">View all users</span>
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link to='/users/create'>
                                        <span className="sidebar-normal">User creation</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    }
                    <li>
                        <Link to='/categories' >
                            <i className="fas fa-edit"/>
                            <p>Categories</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/measures'>
                            <i className="fa fa-thermometer-half"/>
                            <p>Measurements</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/graphs'>
                            <i className="fa fa-chart-area"/>
                            <p>Comparisons</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile' >
                            <i className="fa fa-users"/>
                            <p>Profile</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

const mapStateToProps = state => ({
        isAdmin: state.user.role_id === 1
});

export default connect(mapStateToProps)(SidebarUI)
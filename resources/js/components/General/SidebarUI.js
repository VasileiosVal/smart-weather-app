import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const SidebarUI = ({isAdmin}) => (
        <div className="sidebar" data-color="orange" data-active-color="info">
            <div className="logo">
                <a href="http://www.creative-tim.com" className="simple-text logo-mini">
                    <div className="logo-image-small">
                        <i className="fas fa-globe-americas"/>
                    </div>
                </a>
                <Link to='/dashboard' className="simple-text simple-text-title">
                    Smart Weather App
                </Link>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li>
                        <Link to='/dashboard'>
                            <i className="fas fa-tachometer-alt"/>
                            <p>Πίνακας ελέγχου</p>
                        </Link>
                    </li>
                    <li>
                        <a id='collapse-link' data-toggle="collapse" href="#componentsExamples1">
                            <i className="fas fa-broadcast-tower"/>
                            <p>
                                Σταθμοί
                                <b className="caret"/>
                            </p>
                        </a>
                        <div className="collapse " id="componentsExamples1">
                            <ul>
                                <li className="nav-item ">
                                    <Link to='/stations'>
                                        <span className="sidebar-normal">Οι σταθμοί μου</span>
                                    </Link>
                                </li>
                                {isAdmin &&
                                <li className="nav-item">
                                    <Link to='/stations/all'>
                                        <span className="sidebar-normal">Προβολή όλων</span>
                                    </Link>
                                </li>
                                }
                                <li className="nav-item ">
                                    <Link to='/stations/create'>
                                        <span className="sidebar-normal">Δημιουργία σταθμού</span>
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
                                Χρήστες
                                <b className="caret"/>
                            </p>
                        </a>
                        <div className="collapse" id="componentsExamples2">
                            <ul>
                                <li className="nav-item ">
                                    <Link to='/users'>
                                        <span className="sidebar-normal">Προβολή όλων</span>
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link to='/users/create'>
                                        <span className="sidebar-normal">Δημιουργία χρήστη</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    }
                    <li>
                        <Link to='/categories' >
                            <i className="fas fa-edit"/>
                            <p>Κατηγορίες</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/measures'>
                            <i className="fa fa-thermometer-half"/>
                            <p>Μετρήσεις</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/graphs'>
                            <i className="fa fa-chart-area"/>
                            <p>Συγκρίσεις</p>
                        </Link>
                    </li>
                    <li>
                        <a id='collapse-link' data-toggle="collapse" href="#componentsExamples4">
                            <i className="fa fa-bell"/>
                            <p>
                                Ενημερώσεις
                                <b className="caret"/>
                            </p>
                        </a>
                        <div className="collapse " id="componentsExamples4">
                            <ul>
                                <li className="nav-item ">
                                    <a href="./components/notifications.html">
                                        <span className="sidebar-normal">Notifications</span>
                                    </a>
                                </li>
                                <li className="nav-item ">
                                    <a href="./components/icons.html">
                                        <span className="sidebar-normal">Icons</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Link to='/profile' >
                            <i className="fa fa-users"/>
                            <p>Προφίλ</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );

const mapStateToProps = state =>  ({
        isAdmin: state.user.role_id === 1
});

export default withRouter(connect(mapStateToProps)(SidebarUI))
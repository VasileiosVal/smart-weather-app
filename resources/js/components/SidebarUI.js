import React from 'react';
import {Link, NavLink} from 'react-router-dom'

export default class SidebarUI extends React.Component {
    render() {
        return (
            <div className="sidebar" data-color="orange" data-active-color="info">
                <div className="logo">
                    <a href="http://www.creative-tim.com" className="simple-text logo-mini">
                        <div className="logo-image-small">
                            <i className="fas fa-globe-americas"></i>
                        </div>
                    </a>
                    <Link to='/dashboard' className="simple-text simple-text-title">
                        Smart Weather App
                    </Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li>
                            <NavLink to='/dashboard' exact activeClassName='active'>
                                <i className="fas fa-tachometer-alt"></i>
                                <p>Πίνακας ελέγχου</p>
                            </NavLink>
                        </li>
                        <li>
                            <a data-toggle="collapse" href="#componentsExamples1">
                                <i className="nc-icon nc-app"></i>
                                <p>
                                    Σταθμοί
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="componentsExamples1">
                                <ul >
                                    <li className="nav-item ">
                                        <a href="./components/sweet-alert.html">
                                            <span className="sidebar-normal">Sweet Alert</span>
                                        </a>
                                    </li>
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
                            <a data-toggle="collapse" href="#componentsExamples2">
                                <i className="nc-icon nc-app"></i>
                                <p>
                                    Χρήστες
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="componentsExamples2">
                                <ul >
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
                            <NavLink to='/categories' exact activeClassName='active'>
                                <i className="fas fa-edit"></i>
                                <p>Κατηγορίες</p>
                            </NavLink>
                        </li>
                        <li>
                            <a href="./icons.html">
                                <i className="fa fa-users"></i>
                                <p>Μετρήσεις</p>
                            </a>
                        </li>
                        <li>
                            <a href="./icons.html">
                                <i className="fa fa-users"></i>
                                <p>Ιστορικό</p>
                            </a>
                        </li>
                        <li>
                            <a data-toggle="collapse" href="#componentsExamples3">
                                <i className="nc-icon nc-app"></i>
                                <p>
                                    Ενημερώσεις
                                    <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="componentsExamples3">
                                <ul >
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
                            <a href="./icons.html">
                                <i className="fa fa-users"></i>
                                <p>Προφίλ</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            );
    }
}
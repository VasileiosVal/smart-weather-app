import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class SidebarUI extends React.Component {
    render() {
        return (
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
                            <NavLink to='/dashboard' exact activeClassName='active'>
                                <i className="fas fa-tachometer-alt"/>
                                <p>Πίνακας ελέγχου</p>
                            </NavLink>
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
                                <ul >
                                    <li className="nav-item ">
                                        <NavLink to='/stations' exact activeClassName='active'>
                                            <span className="sidebar-normal">Οι σταθμοί μου</span>
                                        </NavLink>
                                    </li>
                                    {this.props.isAdmin &&
                                    <li className="nav-item ">
                                        <NavLink to='/stations/all' exact activeClassName='active'>
                                            <span className="sidebar-normal">Προβολή όλων</span>
                                        </NavLink>
                                    </li>
                                    }
                                    <li className="nav-item ">
                                        <NavLink to='/stations/create' exact activeClassName='active'>
                                            <span className="sidebar-normal">Δημιουργία σταθμού</span>
                                         </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {this.props.isAdmin &&
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
                                        <NavLink exact to='/users' activeClassName='active'>
                                            <span className="sidebar-normal">Προβολή όλων</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ">
                                        <NavLink exact to='/users/create' activeClassName='active'>
                                            <span className="sidebar-normal">Δημιουργία χρήστη</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        }
                        <li>
                            <NavLink to='/categories' exact activeClassName='active'>
                                <i className="fas fa-edit"/>
                                <p>Κατηγορίες</p>
                            </NavLink>
                        </li>
                        {this.props.isAdmin ?
                            <li>
                                <NavLink to='/measures/all' exact activeClassName='active'>
                                    <i className="fa fa-chart-area"/>
                                    <p>Μετρήσεις</p>
                                </NavLink>
                            </li>
                            :
                            <li>
                                <a id='collapse-link' data-toggle="collapse" href="#componentsExamples3">
                                    <i className="fa fa-chart-area"/>
                                    <p>
                                        Μετρήσεις
                                        <b className="caret"/>
                                    </p>
                                </a>
                                <div className="collapse" id="componentsExamples3">
                                    <ul>
                                        <li className="nav-item ">
                                            <NavLink to='/measures' exact activeClassName='active'>
                                                <span className="sidebar-normal">Προβολή μετρήσεων των σταθμών μου</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink exact to='/measures/other' activeClassName='active'>
                                                <span className="sidebar-normal">Προβολή μετρήσεων άλλων σταθμών</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        }

                        <li>
                            <NavLink to='/history' exact activeClassName='active'>
                                <i className="fa fa-history"/>
                                <p>Ιστορικό</p>
                            </NavLink>
                        </li>
                        <li>
                            <a id='collapse-link' data-toggle="collapse" href="#componentsExamples4">
                                <i className="nc-icon nc-app"/>
                                <p>
                                    Ενημερώσεις
                                    <b className="caret"/>
                                </p>
                            </a>
                            <div className="collapse " id="componentsExamples4">
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
                            <NavLink to='/profile' exact activeClassName='active'>
                                <i className="fa fa-users"/>
                                <p>Προφίλ</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.role_id === 1
    }
};

export default connect(mapStateToProps)(SidebarUI)
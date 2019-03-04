import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {logout} from "../../general_functions/generalFunctions";

let NavbarUI = ({name}) => (
        <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-toggle">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1"/>
                            <span className="navbar-toggler-bar bar2"/>
                            <span className="navbar-toggler-bar bar3"/>
                        </button>
                    </div>
                    <p className="navbar-brand">Καλώς ήρθες: <Link className='navbar-name' to='/profile'>{name}</Link></p>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab"/>
                    <span className="navbar-toggler-bar navbar-kebab"/>
                    <span className="navbar-toggler-bar navbar-kebab"/>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navigation">
                    <ul className="navbar-nav">
                        <li title='ενέργειες' className="nav-item btn-rotate dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user"/>
                                <p><span className="d-lg-none d-md-block">Ενέργειες</span></p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a onClick={()=>logout()} className="dropdown-item"><i className="fas fa-sign-out-alt"/>Αποσύνδεση</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

const mapStateToProps = state => ({
        name: state.user.name
    });

export default connect(mapStateToProps)(NavbarUI)
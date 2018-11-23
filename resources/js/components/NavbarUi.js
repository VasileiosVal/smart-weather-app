import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {logoutUser, startLogoutUser} from "../actions/Auth";
import {logout} from "../general_functions/generalFunctions";

class NavbarUI extends React.Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
    }
    logout(){
        this.props.dispatch(startLogoutUser()).then(()=>{logout()})
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" className="navbar-toggler">
                                <span className="navbar-toggler-bar bar1"></span>
                                <span className="navbar-toggler-bar bar2"></span>
                                <span className="navbar-toggler-bar bar3"></span>
                            </button>
                        </div>
                        <a className="navbar-brand" href="#pablo">Καλώς ήρθατε</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <form>
                            <div className="input-group no-border">
                                <input type="text" className="form-control" placeholder="Search..."/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <i className="fa fa-users"></i>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link btn-magnify" href="#pablo">
                                    <i className="fa fa-users"></i>
                                    <p>
                                        <span className="d-lg-none d-md-block">Stats</span>
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item btn-rotate dropdown">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user"></i>                                    <p>
                                        <span className="d-lg-none d-md-block">Some Actions</span>
                                    </p>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <button onClick={this.logout} className="dropdown-item"><i className="fas fa-sign-out-alt"></i>Αποσύνδεση</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
export default withRouter(connect(mapStateToProps)(NavbarUI))
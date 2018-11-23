import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import History from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import Sidebar from '../components/SidebarUI';
import Navbar from '../components/NavbarUi';
import Footer from '../components/Footer';
import Dashboard from "../components/Dashboard";
import Category from '../components/Category'
import {Create} from "../components/Create";
import {NotFound} from "../components/NotFound";


export const history = History();

class AppRouter extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Router history={history}>
                <div className="wrapper">
                    <Sidebar/>
                    <div className="main-panel">
                        <Navbar/>
                        <Switch>
                            <Route path='/dashboard' component={Dashboard} exact/>
                            <Route path='/categories' component={Category} exact/>
                            <Route path='/create' component={Create} exact/>
                            <Route component={NotFound}/>
                        </Switch>
                    <Footer/>
                    </div>
                </div>
            </Router>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
};
export default connect(mapStateToProps)(AppRouter)
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
import AdminRoute from '../components/AdminRoute';
import User from "../components/User";
import UserCreate from "../components/UserCreate";
import Profile from "../components/Profile";
import ProfileEdit from "../components/ProfileEdit";


export const history = History();

class AppRouter extends React.Component {
    constructor(props){
        super(props)
        console.log(props.language)
        console.log(props.user)
        console.log(props.categories)
        console.log(props.stations)
        console.log(props.users)
    }
    componentDidMount(){

    }
    render() {
        return (
            <Router history={history}>
                <div className="wrapper">
                    <Sidebar/>
                    <div className="main-panel">
                        <Navbar/>
                        <Switch>
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route exact path='/categories' component={Category} />
                            <AdminRoute exact path='/users/create' component={UserCreate} />
                            <AdminRoute exact path='/users' component={User} />
                            <Route exact path='/profile' component={Profile}/>
                            <Route exact path='/profile/edit' component={ProfileEdit}/>
                            <Route exact path='/create' component={Create} />
                            <Route component={NotFound}/>
                        </Switch>
                        <Footer/>
                    </div>
                </div>
            </Router>
            )
        }
}

const mapStateToProps = (state) => {
    return {
        language: state.language,
        user: state.user,
        categories: state.categories,
        stations: state.stations,
        users: state.users
    }
}

export default connect(mapStateToProps)(AppRouter)
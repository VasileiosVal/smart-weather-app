import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import History from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import Sidebar from '../components/SidebarUI';
import Navbar from '../components/NavbarUi';
import Footer from '../components/Footer';
import Dashboard from "../components/Dashboard";
import Category from '../components/Category'
import {NotFound} from "../components/NotFound";
import AdminRoute from '../components/AdminRoute';
import User from "../components/User";
import UserCreate from "../components/UserCreate";
import Profile from "../components/Profile";
import ProfileEdit from "../components/ProfileEdit";
import StationOwn from "../components/StationOwn";
import StationCreate from "../components/StationCreate";
import StationAll from "../components/StationAll";
import StationEdit from "../components/StationEdit";
import MeasureAll from "../components/MeasureAll";
import MeasureOwn from "../components/MeasureOwn";
import MeasureOther from "../components/MeasureOther";
import UserRoute from "../components/UserRoute";
import HistoryComp from '../components/History';


export const history = History();

class AppRouter extends React.Component {
    constructor(props){
        super(props)
        // console.log(props.language)
        console.log(props.user)
        console.log(props.users)
        console.log(props.categories)
        console.log(props.stations)
        console.log(props.collections)
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
                            <Route exact path='/stations' component={StationOwn} />
                            <AdminRoute exact path='/stations/all' component={StationAll} />
                            <Route exact path='/stations/create' component={StationCreate} />
                            <Route exact path='/stations/:name/edit' component={StationEdit}/>
                            <AdminRoute exact path='/users' component={User} />
                            <AdminRoute exact path='/users/create' component={UserCreate} />
                            <Route exact path='/categories' component={Category} />
                            <AdminRoute exact path='/measures/all' component={MeasureAll}/>
                            <UserRoute exact path='/measures/other' component={MeasureOther}/>
                            <UserRoute exact path='/measures' component={MeasureOwn}/>
                            <Route exact path='/history' component={HistoryComp}/>
                            <Route exact path='/profile' component={Profile}/>
                            <Route exact path='/profile/edit' component={ProfileEdit}/>
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
        // language: state.language,
        user: state.user,
        users: state.users,
        categories: state.categories,
        stations: state.stations,
        collections: state.collections,
    }
}

export default connect(mapStateToProps)(AppRouter)
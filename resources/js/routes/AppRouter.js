import React from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Sidebar from '../components/General/SidebarUI';
import Navbar from '../components/General/NavbarUi';
import Footer from '../components/General/Footer';
import Dashboard from "../components/Dashboard/Dashboard";
import Category from '../components/Categories/Category'
import NotFound from "../components/General/NotFound";
import AdminRoute from './AdminRoute';
import User from "../components/Users/User";
import UserCreate from "../components/Users/UserCreate";
import Profile from "../components/Profile/Profile";
import ProfileEdit from "../components/Profile/ProfileEdit";
import StationOwn from "../components/Stations/StationOwn";
import StationCreate from "../components/Stations/StationCreate";
import StationAll from "../components/Stations/StationAll";
import StationEdit from "../components/Stations/StationEdit";
import ProfileShowOther from "../components/Profile/ProfileShowOther";
import StationShow from "../components/Stations/StationShow";
import Measures from "../components/Measures/Measures";
import Graphs from "../components/Graphs/Graphs";


let AppRouter = (props) => {
    console.log(props.user)
    console.log(props.users)
    console.log(props.categories)
    console.log(props.stations)
    console.log(props.collections)
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Sidebar/>
                <div className="main-panel">
                    <Navbar/>
                    <Switch>
                        <Route exact path='/dashboard' component={Dashboard}/>
                        <Route exact path='/stations' component={StationOwn}/>
                        <AdminRoute exact path='/stations/all' component={StationAll}/>
                        <Route exact path='/stations/create' component={StationCreate}/>
                        <Route exact path='/stations/:name/edit' component={StationEdit}/>
                        <AdminRoute exact path='/stations/:name/show' component={StationShow}/>
                        <AdminRoute exact path='/users' component={User}/>
                        <AdminRoute exact path='/users/create' component={UserCreate}/>
                        <Route exact path='/categories' component={Category}/>
                        <Route exact path='/measures' component={Measures}/>
                        <Route exact path='/graphs' component={Graphs}/>
                        <Route exact path='/profile' component={Profile}/>
                        <Route exact path='/profile/edit' component={ProfileEdit}/>
                        <AdminRoute exact path='/profile/:email' component={ProfileShowOther}/>
                        <Route exact path='/not-found' component={NotFound}/>
                        <Redirect to='/not-found'/>
                    </Switch>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = state => ({
        // language: state.language,
        user: state.user,
        users: state.users,
        categories: state.categories,
        stations: state.stations,
        collections: state.collections,
    });

export default connect(mapStateToProps)(AppRouter)
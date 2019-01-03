import React from 'react';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import ModalUserDelete from './ModalUserDelete';
import {startDeleteUser, startEditUser} from "../../actions/User";
import {
    notifyDeletedUser, notifyDeletedUserStations, notifyDeletedUserStationsCollections, notifyEditedUser,
    notifyNoChangesMade
} from "../../general_functions/notifiers";
import {UserEdit} from "./UserEdit";
import {CardBelowHeaderTitle, CardHeaderTitle} from "../../containers/generalContainers";
import UserRender from "./UserRender";

class User extends React.Component {
    state = {
        editCompShow: false,
        editCompUserEmail: undefined,
        editCompUserRole: undefined,
        editCompUserActive: undefined,
        deleteUserEmail: undefined,
        activePage: 1,
        itemsCountPerPage: 8,
        pageRangeDisplayed: 3,
        firstIndex: 0,
        lastIndex: 0
    };
    componentDidMount(){
        this.checkForPagination()
    }
    componentDidUpdate(prevProps){
        if(this.props.users.length < prevProps.users.length && this.state.activePage > 1){
            this.setState({activePage: 1}, () => this.checkForPagination());
        }
    }
    checkForPagination = () => {
        let firstIndex = 0;
        let lastIndex = this.state.itemsCountPerPage;
        if(this.props.users.length > this.state.itemsCountPerPage){
            lastIndex = this.state.activePage * this.state.itemsCountPerPage;
            firstIndex = lastIndex - this.state.itemsCountPerPage;
        }
        this.setState({
            firstIndex,
            lastIndex
        })
    }
    handlePageChange = (pageNumber) => {
        this.clearAllInputsAndSetIncomingData();
        this.setState(
            {activePage: pageNumber},
            () => this.checkForPagination()
        );
    }
    clearAllInputsAndSetIncomingData = (editCompShow=false, editCompUserEmail=undefined, editCompUserRole=undefined, editCompUserActive=undefined) => {
        this.setState({
            editCompShow: false,
            editCompUserEmail: undefined,
            editCompUserRole: undefined,
            editCompUserActive: undefined,
            deleteUserEmail: undefined
        }, () => {
            if(editCompShow && editCompUserEmail && editCompUserRole){
                this.setState({
                    editCompShow,
                    editCompUserEmail,
                    editCompUserRole,
                    editCompUserActive})
            }
        })
    }
    closeEditComp = () => this.clearAllInputsAndSetIncomingData()
    editUser = (e) => {
        e.preventDefault();
        let role_id = parseInt(e.target.elements.role.value.trim());
        let is_active = parseInt(e.target.elements.active.value.trim());

        this.props.dispatch(startEditUser(this.state.editCompUserEmail, role_id, is_active)).then((val='')=>{
            if(val !== 'same'){
                notifyEditedUser();
            } else {
                notifyNoChangesMade();
            }
            this.clearAllInputsAndSetIncomingData();
        })
    }
    deleteUser = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteUser(this.state.deleteUserEmail)).then((val=1) => {
            notifyDeletedUser();
            if(val === 2){
                notifyDeletedUserStations();
            } else if(val === 3){
                notifyDeletedUserStations();
                notifyDeletedUserStationsCollections();
            }
            this.clearAllInputsAndSetIncomingData();
        })
    }

    render(){

        //******RENDER USERS
        let renderUsers = (
            <UserRender
            {...this.props}
            {...this.state}
            onClickUpdate={(email, role_id, is_active) => this.clearAllInputsAndSetIncomingData(true, email, role_id, is_active)}
            onClickDelete={(email) => {
                this.clearAllInputsAndSetIncomingData();
                this.setState({deleteUserEmail: email}, ()=> $('#modal').modal())
            }}
            />
        );

        //******CHECK AND RENDER PAGINATION
        let pagination = (
            this.props.users.length > this.state.itemsCountPerPage &&
            <Pagination
                activePage={this.state.activePage}
                totalItemsCount={this.props.users.length}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                itemsCountPerPage={this.state.itemsCountPerPage}
                onChange={this.handlePageChange}
                innerClass={'pagination justify-content-center'}
                itemClass={'page-item'}
                linkClass={'page-link'}
            />
        );

        //******CHECK FOR RENDERING USER_EDIT
        let userEdit = (
            this.state.editCompShow &&
            <UserEdit
                {...this.state}
                closeEdit={this.closeEditComp}
                edit={this.editUser}
            />
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let modalForDelete = (
            this.state.deleteUserEmail &&
            <ModalUserDelete
                deleteUser={this.deleteUser}
                emailOfUser={this.state.deleteUserEmail}
            />
        );

        return (
            <div className="content">
                <CardHeaderTitle name='Χρήστες'/>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <CardBelowHeaderTitle name='Προβολή όλων των χρηστών'/><hr/>
                            <div className="card-body">
                                <div className="table-responsive">
                                {renderUsers}
                                {pagination}
                                </div>
                            </div>
                        </div>
                        {userEdit}
                    </div>
                </div>
                {modalForDelete}
            </div>
        )
    }
}

const mapStateToProps = state => ({
        myId: state.user.id,
        users: state.users,
        stations: state.stations
    });

export default connect(mapStateToProps)(User)
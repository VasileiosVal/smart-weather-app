import React from 'react';
import {connect} from 'react-redux'
import Pagination from "react-js-pagination";
import moment from "moment/moment";
import {Link} from 'react-router-dom';
import ModalUserDelete from './ModalUserDelete';
import {startDeleteUser, startEditUser} from "../actions/User";
import {notifyDeletedUser, notifyEditedUser} from "../general_functions/notifiers";
import {UserEdit} from "./UserEdit";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.clearAllInputsAndSetIncomingData = this.clearAllInputsAndSetIncomingData.bind(this);
        this.closeEditComp = this.closeEditComp.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.checkForPagination = this.checkForPagination.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
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
        }
    }
    componentDidMount() {
        this.checkForPagination()
    }
    componentDidUpdate(prevProps){
        if(this.props.users.length < prevProps.users.length){
            this.setState(
                {activePage: 1},
                () => this.checkForPagination()
            );
        }
    }
    checkForPagination(){
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
    handlePageChange(pageNumber) {
        this.clearAllInputsAndSetIncomingData();
        this.setState(
            {activePage: pageNumber},
            () => this.checkForPagination()
        );
    }
    clearAllInputsAndSetIncomingData(editCompShow=false, editCompUserEmail=undefined, editCompUserRole=undefined, editCompUserActive=undefined){
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
    closeEditComp(){
        this.clearAllInputsAndSetIncomingData();
    }
    editUser(e){
        e.preventDefault();
        let role_id = parseInt(e.target.elements.category.value.trim());
        let is_active = parseInt(e.target.elements.active.value.trim());

        this.props.dispatch(startEditUser(this.state.editCompUserEmail, role_id, is_active)).then(()=>{
            notifyEditedUser();
            this.clearAllInputsAndSetIncomingData();
        })
    }
    deleteUser(){
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteUser(this.state.deleteUserEmail)).then(() => {
            notifyDeletedUser();
            this.clearAllInputsAndSetIncomingData();
        })
    }
    render() {
        return (
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Χρήστες</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Προβολή όλων των χρηστών</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table text-center">
                                        <thead className="text-primary">
                                        <tr>
                                            <th>id</th>
                                            <th>Όνομα</th>
                                            <th>Επώνυμο</th>
                                            <th>Email</th>
                                            <th>Κατηγορία</th>
                                            <th>Ενεργός</th>
                                            <th>Επιβεβαιωμένος</th>
                                            <th>Σταθμοί</th>
                                            <th>Ημ. δημιουργίας</th>
                                            <th>Ημ. ανανέωσης</th>
                                            <th>Ενέργειες</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.users.slice(this.state.firstIndex, this.state.lastIndex).map((user) => {
                                            return <tr key={user.id}>
                                                <td>{user.id}</td>
                                                {user.email === this.props.myEmail ?
                                                    <td><Link to='/profile'
                                                              title='Μετάβαση στο προφιλ'>{user.name}</Link></td>
                                                    :
                                                    <td>{user.name}</td>
                                                }
                                                <td>{user.surname}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role_id === 1 ? 'Διαχειριστής' : 'Χρήστης'}</td>
                                                <td>{user.is_active ? 'Ναι' : 'Οχι'}</td>
                                                <td>{user.confirmed ? moment(user.confirmed).format('llll') : 'Οχι'}</td>
                                                <td>{user.stations.length ? user.stations.length : 'Οχι'}</td>
                                                <td>{moment(user.created_at).fromNow()}</td>
                                                <td>{moment(user.updated_at).fromNow()}</td>
                                                {user.id !== 1 && user.email !== this.props.myEmail &&
                                                <td>
                                                    <i title='Επεξεργασία'
                                                       onClick={() => {
                                                           this.clearAllInputsAndSetIncomingData(true, user.email, user.role_id, user.is_active)
                                                       }}
                                                       className='fa fa-edit mx-2 point'/>

                                                    <i title='Διαγραφή'
                                                       onClick={() => {
                                                           this.clearAllInputsAndSetIncomingData();
                                                           this.setState({deleteUserEmail: user.email}, ()=>{
                                                                $('#modal').modal();
                                                           })

                                                       }}
                                                       className='fas fa-trash-alt mx-2 point'/>
                                                </td>
                                                }
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                    {this.props.users.length > this.state.itemsCountPerPage &&
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
                                    }
                                </div>
                            </div>
                        </div>
                        {this.state.editCompShow &&
                        <UserEdit {...this.state}
                                  closeEdit={this.closeEditComp}
                                  edit={this.editUser}/>
                        }
                    </div>
                </div>
                {this.state.deleteUserEmail &&
                <ModalUserDelete deleteUser={this.deleteUser}
                                 emailOfUser={this.state.deleteUserEmail}/>
                }
            </div>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        myEmail: state.user.email,
        users: state.users
    }
}
export default connect(mapStateToProps)(User)
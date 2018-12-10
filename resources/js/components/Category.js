import React from 'react';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import moment from 'moment';
moment.locale('el');
import {CategoryCreation} from "./CategoryCreation";
import {startCreateCategory, startDeleteCategory, startEditCategory} from "../actions/Category";
import Modal from './ModalCategoryDelete'
import {
    notifyCreatedEl, notifyDeletedEl, notifyEditedEl, notifyEmptyEl, notifySameName,
    notifySameSymbol
} from "../general_functions/notifiers";
import {CategoryEdit} from "./CategoryEdit";


class Category extends React.Component{
    constructor(props){
        super(props);
        this.submitCategory = this.submitCategory.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.checkForPagination = this.checkForPagination.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.clearAllInputsAndSetIncomingData = this.clearAllInputsAndSetIncomingData.bind(this);
        this.closeEditComp = this.closeEditComp.bind(this);
        this.state = {
            editCompShow: false,
            editCompCategoryName: undefined,
            editCompCategorySymbol: undefined,
            deleteCategoryName: undefined,
            activePage: 1,
            itemsCountPerPage: 2,
            pageRangeDisplayed: 3,
            firstIndex: 0,
            lastIndex: 0
        };
    }
    componentDidMount() {
        this.checkForPagination();
    }
    componentDidUpdate(prevProps){
        if(this.props.categories.length < prevProps.categories.length){
        this.setState(
            {activePage: 1},
            () => this.checkForPagination()
        );
        }
    }
    checkForPagination(){
        let firstIndex = 0;
        let lastIndex = this.state.itemsCountPerPage;
        if(this.props.categories.length > this.state.itemsCountPerPage){
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
    clearAllInputsAndSetIncomingData(bool = true, editCompShow=false, editCompCategoryName=undefined, editCompCategorySymbol=undefined){
        this.setState({editCompShow: false,
            editCompCategoryName: undefined,
            editCompCategorySymbol: undefined,
            deleteCategoryName: undefined
        }, () => {
            if(bool){this.props.isAdmin && document.getElementById('formData').reset() }
            if(editCompShow && editCompCategoryName && editCompCategorySymbol){
                this.setState({
                    editCompShow,
                    editCompCategoryName,
                    editCompCategorySymbol})
            }
        })
    }
    closeEditComp(){
        this.clearAllInputsAndSetIncomingData();
    }
    submitCategory(e){
        e.preventDefault();
        let foundObjWithName;
        let foundObjWithSymbol;
        let lastName = this.state.editCompCategoryName;
        let lastSymbol = this.state.editCompCategorySymbol;

        let name = e.target.elements.name.value.trim();
        let symbol = e.target.elements.symbol.value.trim();
        if(!name || !symbol) {
            notifyEmptyEl()
        } else {
            foundObjWithName = this.props.categories.find((category)=>{
                return category.name === name;
            });
            foundObjWithSymbol = this.props.categories.find((category)=>{
                return category.symbol === symbol;
            });
            if(foundObjWithName && foundObjWithName.name === lastName){foundObjWithName=undefined}
            if(foundObjWithSymbol && foundObjWithSymbol.symbol === lastSymbol){foundObjWithSymbol=undefined}
            if(foundObjWithName) {
                notifySameName()
            } else if(foundObjWithSymbol) {
                notifySameSymbol()
            } else {
                if(!lastName){
                    this.props.dispatch(startCreateCategory(name, symbol)).then(()=>{
                        notifyCreatedEl();
                        this.clearAllInputsAndSetIncomingData();
                    })
                } else {
                    this.props.dispatch(startEditCategory(lastName, name, symbol)).then(()=>{
                        notifyEditedEl();
                        this.clearAllInputsAndSetIncomingData();
                    })
                }
            }
        }
    }
    deleteCategory(){
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteCategory(this.state.deleteCategoryName)).then(()=>{
            notifyDeletedEl();
            this.clearAllInputsAndSetIncomingData();
        })
    }
    render(){
        return <div className="content">
            <div>
                <h5 className="card-title text-center">Κατηγορίες</h5>
                <p className="card-category">Handcrafted by our friends from
                    <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                </p>
            </div>
            <div className="row">
                {this.props.isAdmin ?
                    <CategoryCreation clearAllInputsAndSetIncomingData={this.clearAllInputsAndSetIncomingData}
                                      submitCategory={this.submitCategory}/>
                    : undefined //Πληροφοριες για τις κατηγοριες
                }
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                            <h4 className="text-center">Προβολή όλων των κατηγοριών</h4>
                        </div>
                        <hr/>
                        <div className="card-body">
                            {this.props.categories.length > 0 ?
                                <div className="table-responsive">
                                    <table className="table text-center">
                                        <thead className="text-primary">
                                        <tr>
                                            {this.props.isAdmin && <th>id</th> }
                                            <th>Όνομα</th>
                                            <th>Σύμβολο</th>
                                            <th>Δημιουργία</th>
                                            {this.props.isAdmin &&
                                            <th>Ενέργειες</th>
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.categories.slice(this.state.firstIndex, this.state.lastIndex).map((category) => {
                                            return <tr key={category.id}>
                                                {this.props.isAdmin && <td>{category.id}</td>}
                                                <td>{category.name}</td>
                                                <td>{category.symbol}</td>
                                                <td>{moment(category.created_at).fromNow()}</td>
                                                {this.props.isAdmin &&
                                                <td>
                                                    <i title='Επεξεργασία'
                                                       onClick={() => {
                                                           this.clearAllInputsAndSetIncomingData(true, true, category.name, category.symbol)
                                                       }}
                                                       className='fa fa-edit mx-2 point'/>

                                                    <i title='Διαγραφή'
                                                       onClick={() => {
                                                           this.clearAllInputsAndSetIncomingData();
                                                           this.setState({deleteCategoryName: category.name}, () => {
                                                               $('#modal').modal();
                                                           })//
                                                       }}
                                                       className='fas fa-trash-alt mx-2 point'/>
                                                </td>
                                                }
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                    {this.props.categories.length > this.state.itemsCountPerPage &&
                                    <Pagination
                                        activePage={this.state.activePage}
                                        totalItemsCount={this.props.categories.length}
                                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        onChange={this.handlePageChange}
                                        innerClass={'pagination justify-content-center'}
                                        itemClass={'page-item'}
                                        linkClass={'page-link'}
                                    />
                                    }
                                </div>
                                : <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν κατηγορίες</h4>}
                        </div>
                    </div>
                    {this.props.isAdmin && this.state.editCompShow &&
                    <CategoryEdit edit={this.submitCategory}
                                  show={this.state.editCompShow}
                                  name={this.state.editCompCategoryName}
                                  symbol={this.state.editCompCategorySymbol}
                                  closeEdit={this.closeEditComp}/>
                    }
                </div>
            </div>
            {this.props.isAdmin && this.state.deleteCategoryName &&
            <Modal deleteCategory={this.deleteCategory}
                   nameOfCategory={this.state.deleteCategoryName}/>
            }
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.role_id === 1,
        categories: state.categories
    }
};
export default connect(mapStateToProps)(Category)
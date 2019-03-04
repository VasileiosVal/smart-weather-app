import React from 'react';
import {connect} from 'react-redux';
import Pagination from "react-js-pagination";
import CategoryCreate from "./CategoryCreate";
import {startCreateCategory, startDeleteCategory, startEditCategory} from "../../actions/Category";
import Modal from './ModalCategoryDelete'
import {
    notifyCreatedEl, notifyDeletedEl, notifyEditedEl, notifyEmptyEl, notifyGeneralCategories, notifyNoChangesMade,
    notifySameName,
    notifySameSymbol
} from "../../general_functions/notifiers";
import {refreshPage, regexFindGreek} from "../../general_functions/generalFunctions";
import {CardBelowHeaderTitle, CardHeaderTitle} from "../../containers/generalContainers";
import CategoryRender from "./CategoryRender";
import CategoryEdit from "./CategoryEdit";


class Category extends React.Component {
    state = {
        name: '',
        symbol: '',
        editCompShow: false,
        editCompCategoryName: undefined,
        editCompCategorySymbol: undefined,
        deleteCategoryName: undefined,
        activePage: 1,
        itemsCountPerPage: 5,
        pageRangeDisplayed: 3,
        firstIndex: 0,
        lastIndex: 0
    };
    componentDidMount() {
        !this.props.isAdmin && notifyGeneralCategories();
        this.checkForPagination();
    }

    checkForPagination = () => {
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
    handlePageChange = pageNumber => {
        this.clearAllInputsAndSetIncomingData();
        this.setState({activePage: pageNumber},
            () => this.checkForPagination()
        );
    }

    clearAllInputsAndSetIncomingData = (editCompShow=false, editCompCategoryName=undefined, editCompCategorySymbol=undefined) => {
        this.setState({
            name: '',
            symbol: '',
            editCompShow: false,
            editCompCategoryName: undefined,
            editCompCategorySymbol: undefined,
            deleteCategoryName: undefined
        }, () => {
            if(editCompShow && editCompCategoryName && editCompCategorySymbol){
                this.setState({
                    editCompShow,
                    editCompCategoryName,
                    editCompCategorySymbol})
            }
        })
    }
    clearDeleteEditAndSetCreateValues = e => {
        this.setState({
            [e.target.name]: e.target.value,
            editCompShow: false,
            editCompCategoryName: undefined,
            editCompCategorySymbol: undefined,
            deleteCategoryName: undefined
        })
    }

    handleChangeValue = e => {
        if(e.target.name !== 'name'){
            this.clearDeleteEditAndSetCreateValues(e);
        } else {
            !regexFindGreek(e.target.value) &&
            this.clearDeleteEditAndSetCreateValues(e);
        }
    }

    submitCategory = e => {
        e.preventDefault();
        let foundObjWithName;
        let foundObjWithSymbol;
        let lastName = this.state.editCompCategoryName;
        let lastSymbol = this.state.editCompCategorySymbol;

        let name = lastName && lastSymbol ? e.target.elements.name.value.trim() : this.state.name.trim();
        let symbol = lastName && lastSymbol ? e.target.elements.symbol.value.trim() : this.state.symbol.trim();
        if(!name || !symbol) {
            notifyEmptyEl();
        } else {
            foundObjWithName = this.props.categories.find(category => category.name === name);
            foundObjWithSymbol = this.props.categories.find(category => category.symbol === symbol);
            if(foundObjWithName && foundObjWithName.name === lastName) foundObjWithName=undefined;
            if(foundObjWithSymbol && foundObjWithSymbol.symbol === lastSymbol) foundObjWithSymbol=undefined;
            if(foundObjWithName) {
                notifySameName();
            } else if(foundObjWithSymbol) {
                notifySameSymbol();
            } else {
                if(!lastName){
                    this.props.dispatch(startCreateCategory(name, symbol)).then(()=>{
                        notifyCreatedEl();
                        this.clearAllInputsAndSetIncomingData();
                    })
                } else {
                    this.props.dispatch(startEditCategory(lastName, name, symbol)).then((val='')=>{
                        if(val!=='same'){
                            notifyEditedEl();
                            this.clearAllInputsAndSetIncomingData();
                        } else {
                            notifyNoChangesMade();
                        }
                    })
                }
            }
        }
    }
    deleteCategory = () => {
        $('#modal').modal('hide');
        this.props.dispatch(startDeleteCategory(this.state.deleteCategoryName)).then((val='')=>{
            if(val==='deleted'){
                notifyDeletedEl();
                setTimeout(()=>refreshPage(), 2000);
            }
        })
    }

    render(){

        //******DESTRUCT
        let {isAdmin, categories} = this.props;

        //******CHECK FOR RENDERING CATEGORY_CREATE
        let categoryCreate = (
            isAdmin &&
            <CategoryCreate
                name={this.state.name}
                symbol={this.state.symbol}
                onChangeValue={this.handleChangeValue}
                onSubmitCategory={this.submitCategory}
            />
        );

        //******RENDER CATEGORIES
        let categoryRender = (
            <CategoryRender
                {...this.props}
                {...this.state}
                onClickUpdate={(name, symbol) => this.clearAllInputsAndSetIncomingData(true, name, symbol)}
                onClickDelete={name => {
                    this.clearAllInputsAndSetIncomingData();
                    this.setState({deleteCategoryName: name}, () => $('#modal').modal())
                }}
            />
        );

        //******CHECK AND RENDER PAGINATION
        let pagination = (
            categories.length > this.state.itemsCountPerPage &&
            <Pagination
                activePage={this.state.activePage}
                totalItemsCount={categories.length}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                itemsCountPerPage={this.state.itemsCountPerPage}
                onChange={this.handlePageChange}
                innerClass={'pagination justify-content-center'}
                itemClass={'page-item'}
                linkClass={'page-link'}
            />
        );

        //******CHECK FOR RENDERING CATEGORY_EDIT
        let categoryEdit = (
            isAdmin && !!categories.length && this.state.editCompShow &&
            <CategoryEdit
                edit={this.submitCategory}
                show={this.state.editCompShow}
                name={this.state.editCompCategoryName}
                symbol={this.state.editCompCategorySymbol}
                closeEdit={()=> this.clearAllInputsAndSetIncomingData()}
            />
        );

        //******CHECK FOR RENDERING MODAL_FOR_DELETE
        let modalForDelete = (
            isAdmin && !!categories.length && !!this.state.deleteCategoryName &&
            <Modal
                closeDelete={()=> this.clearAllInputsAndSetIncomingData()}
                deleteCategory={this.deleteCategory}
                nameOfCategory={this.state.deleteCategoryName}
            />
        );

        return (
            <div className="content">
                <CardHeaderTitle name='Κατηγορίες'/>
                    <div className="row">
                        {isAdmin &&
                            <div className="col-md-4">
                                {categoryCreate}
                            </div>
                        }
                        <div className="col">
                            <div className="card animated fadeIn fast">
                                <CardBelowHeaderTitle name='Προβολή όλων των κατηγοριών'/><hr/>
                                <div className="card-body">
                                    {!!categories.length ?
                                        <div className="table-responsive">
                                        {categoryRender}
                                        {pagination}
                                        </div>
                                    :
                                        <h4 className='text-danger text-center mt-0'>Δεν υπάρχουν κατηγορίες</h4>
                                    }
                                </div>
                            </div>
                            {categoryEdit}
                        </div>
                        {modalForDelete}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        isAdmin: state.user.role_id === 1,
        categories: state.categories
});

export default connect(mapStateToProps)(Category)
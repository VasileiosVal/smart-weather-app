import React from 'react';
import {regexFindGreek} from "../../general_functions/generalFunctions";

class CategoryEdit extends React.Component {
    state = {
        name: this.props.name,
        symbol: this.props.symbol
    }
    changeValue = e => {
        if(e.target.name !== 'name'){
            this.setState({[e.target.name]: e.target.value})
        } else {
            !regexFindGreek(e.target.value) && this.setState({[e.target.name]: e.target.value})
        }
    }

    render(){
        return this.props.show && (
            <div className="editCategory card animated fadeIn fast">
                <span className='closeButton' onClick={this.props.closeEdit}><i className="fas fa-times"/></span>
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">Επεξεργασία κατηγορίας: {this.props.name}</h4>
                </div>
                <hr/>
                <div className="card-body text-center">
                    <form onSubmit={this.props.edit}>
                        <div className="form-group">
                            <label>Όνομα</label>
                            <input type='text' name='name' value={this.state.name} onChange={this.changeValue} placeholder='Όνομα κατηγορίας' className='form-control' autoComplete='off'/>
                        </div>
                        <div className="form-group">
                            <label>Σύμβολο</label>
                            <input type='text' name='symbol' value={this.state.symbol} onChange={this.changeValue} placeholder='Σύμβολο' className='form-control' autoComplete='off'/>
                        </div>
                        <div className="form-group">
                            <p className='mb-0'><label>*Υποσημείωση: Στο πεδίο Όνομα δεν είναι αποδεκτοί οι ελληνικοί χαρακτήρες.</label></p>
                            <button className=" btn btn-primary btn-round">Υποβολή</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CategoryEdit
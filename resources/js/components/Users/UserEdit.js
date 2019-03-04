import React from 'react';

class UserEdit extends React.Component {
    state = {
        role: this.props.editCompUserRole.toString(),
        active: this.props.editCompUserActive.toString()
    };
    changeValue = e => this.setState({[e.target.name]: e.target.value})
    render(){

        return this.props.editCompShow && (
            <div className="editUser card animated fadeInDown delay-0.5s">
                <span className='closeButton' onClick={this.props.closeEdit}><i className="fas fa-times"/></span>
                <div className="card-header d-flex flex-row align-items-center justify-content-center py-0">
                    <h4 className="text-center">Επεξεργασία χρήστη: {this.props.editCompUserEmail}</h4>
                </div>
                <hr/>
                <div className="card-body text-center">
                    <form onSubmit={this.props.edit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Κατηγορία</label>
                                    <select name='role' value={this.state.role} onChange={this.changeValue} className='form-control'>
                                        <option value='1'>Διαχειριστής</option>
                                        <option value='2'>Χρήστης</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Ενεργός</label>
                                    <select name='active' value={this.state.active} onChange={this.changeValue} className='form-control'>
                                        <option value='1'>Ναι</option>
                                        <option value='0'>Οχι</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className=" btn btn-primary btn-round">Υποβολή</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserEdit;


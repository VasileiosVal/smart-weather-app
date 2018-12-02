import React from 'react';

export class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.changeRole = this.changeRole.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.state = {
            editCompUserRole: props.editCompUserRole,
            editCompUserActive: props.editCompUserActive
        }
    }
    changeRole(e){
        this.setState({editCompUserRole: e.target.value})
    }
    changeActive(e){
        this.setState({editCompUserActive: e.target.value})
    }
    render(){
        return this.props.editCompShow && (
            <div className="editUser card animated fadeInDown delay-0.5s">
                <span className='closeButton' onClick={this.props.closeEdit}><i className="fas fa-times"/></span>
                <div className="card-header">
                    <h4 className='text-center'>Επεξεργασία χρήστη: {this.props.editCompUserEmail}</h4>
                </div>
                <div className="card-body text-center">
                    <form onSubmit={this.props.edit}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Κατηγορία</label>
                                    <select name='category' value={this.state.editCompUserRole} onChange={this.changeRole} className='form-control'>
                                        <option value='1'>Διαχειριστής</option>
                                        <option value='2'>Χρήστης</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Ενεργός</label>
                                    <select name='active' value={this.state.editCompUserActive} onChange={this.changeActive} className='form-control'>
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


import React from 'react';

export class CategoryEdit extends React.Component{
    constructor(props){
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changeSymbol = this.changeSymbol.bind(this);
        this.state = {
            name: props.name,
            symbol: props.symbol,
        }
    }
    changeName(e){
        this.setState({name:e.target.value})
    }
    changeSymbol(e){
        this.setState({symbol:e.target.value})
    }
    render(){
        return this.props.show && (
            <div className="editCategory card animated fadeInDown delay-0.5s">
                <span className='closeButton' onClick={this.props.closeEdit}><i className="fas fa-times"/></span>
                <div className="card-header">
                    <h4 className='text-center'>Επεξεργασία κατηγορίας: {this.props.name}</h4>
                </div>
                <div className="card-body text-center">
                    <form onSubmit={this.props.edit}>
                        <div className="form-group">
                            <input type='text' name='name' value={this.state.name} onChange={this.changeName} placeholder='Όνομα κατηγορίας' className='form-control' autoComplete='off'/>
                        </div>
                        <div className="form-group">
                            <input type='text' name='symbol' value={this.state.symbol} onChange={this.changeSymbol} placeholder='Σύμβολο' className='form-control' autoComplete='off'/>
                        </div>
                        <div className="form-group">
                            <button className=" btn btn-primary btn-round">Υποβολή</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
import React from 'react';
import {connect} from 'react-redux';

class GraphsAdmin extends React.Component {
    render(){
        return (
            <p>admin</p>
        );
    }
}

const mapStateToProps = () => {
};

export default connect(mapStateToProps)(GraphsAdmin)
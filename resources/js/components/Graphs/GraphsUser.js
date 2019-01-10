import React from 'react';
import {connect} from 'react-redux';

class GraphsUser extends React.Component {
    render(){
        return (
            <p>admin</p>
        );
    }
}

const mapStateToProps = () => {
};

export default connect(mapStateToProps)(GraphsUser)
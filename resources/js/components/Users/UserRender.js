import React from 'react'
import moment from "moment/moment";
import {Link} from 'react-router-dom';
import {findUserStations} from "../../general_functions/generalFunctions";

let UserRender = props => (
    <table className="table text-center">
        <thead className="text-primary">
        <tr>
            <th>id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email address</th>
            <th>Identity</th>
            <th>Active</th>
            <th>Confirmed</th>
            <th>Stations</th>
            <th>Creation date</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {props.users.slice(props.firstIndex, props.lastIndex).map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.id === 1 ? 'Creator' : user.role_id === 1 ? 'Administrator' : 'User'}</td>
                <td>{user.is_active ? 'Yes' : 'No'}</td>
                <td>{user.confirmed ? moment(user.confirmed).format('dddd, D MMM YY') : 'Οχι'}</td>
                <td>{findUserStations(user, props.stations).length ? findUserStations(user, props.stations).length : 'No'}</td>
                <td>{moment(user.created_at).format('dddd, D MMM YY')} ({moment(user.created_at).fromNow()})</td>
                <td>
                    {user.id === props.myId ?
                        <Link to='/profile' title='Go to my profile' className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                    :
                        <Link to={`/profile/${user.email}`} title={`Go to user's profile`} className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                    }
                    {user.id !== 1 && user.id !== props.myId &&
                    <React.Fragment>
                        <i title='Edit'
                           onClick={() => props.onClickUpdate(user.email, user.role_id, user.is_active)}
                           className='fa fa-edit mx-2 point'/>

                        <i title='Delete'
                           onClick={() => props.onClickDelete(user.email)}
                           className='fas fa-trash-alt mx-2 point'/>
                    </React.Fragment>
                    }
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default UserRender
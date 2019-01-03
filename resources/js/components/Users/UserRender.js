import React from 'react'
import moment from "moment/moment";
import {Link} from 'react-router-dom';

let UserRender = props => (
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
            <th>Ενέργειες</th>
        </tr>
        </thead>
        <tbody>
        {props.users.slice(props.firstIndex, props.lastIndex).map(user => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.id === 1 ? 'Δημιουργός' : user.role_id === 1 ? 'Διαχειριστής' : 'Χρήστης'}</td>
                <td>{user.is_active ? 'Ναι' : 'Οχι'}</td>
                <td>{user.confirmed ? moment(user.created_at).format('dddd, D MMM YY') : 'Οχι'}</td>
                <td>{props.stations.filter(station=>station.user_id === user.id).length ?
                    props.stations.filter(station=>station.user_id === user.id).length :
                    'Οχι'}</td>
                <td>{moment(user.created_at).format('dddd, D MMM YY')} ({moment(user.created_at).fromNow()})</td>
                <td>
                    {user.id === props.myId ?
                        <Link to='/profile' title='Μετάβαση στο προφιλ μου' className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                    :
                        <Link to={`/profile/${user.email}`} title='Μετάβαση στο προφιλ του χρήστη' className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                    }
                    {user.id !== 1 && user.id !== props.myId &&
                    <React.Fragment>
                        <i title='Επεξεργασία'
                           onClick={() => props.onClickUpdate(user.email, user.role_id, user.is_active)}
                           className='fa fa-edit mx-2 point'/>

                        <i title='Διαγραφή'
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
import React from 'react';
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {findUserFromStation} from "../../general_functions/generalFunctions";

let StationAllRender = props => (
    <table className="table text-center">
        <thead className="text-primary">
        <tr>
            <th><i className="fas fa-broadcast-tower"/></th>
            <th>id</th>
            <th>Όνομα</th>
            <th>Μοναδικός κωδικός</th>
            <th>Ιδιοκτησία</th>
            <th>Επιλεγμένες κατηγορίες</th>
            <th>Συλογές μετρήσεων</th>
            <th>Ενεργός</th>
            <th>Προβολή</th>
            <th>Τοποθεσία</th>
            <th>Περιγραφή</th>
            <th>Ημ. δημιουργίας</th>
            <th>Ενέργειες</th>
        </tr>
        </thead>
        <tbody>
        {props.stations.slice(props.firstIndex, props.lastIndex).map(station => (
            <tr key={station.id}>
                <td className='border-right pr-2'>{station.is_active ?
                    <i className="text-success fas fa-broadcast-tower"/>
                    :
                    <i className="text-danger fas fa-broadcast-tower"/>
                }</td>
                <td>{station.id}</td>
                <td>{station.name}</td>
                <td>{station.unique.length > 10 ? `${station.unique.substr(0, 10)}...` : station.unique}</td>
                <td>{station.user_id === props.profile.id ?
                    <Link title='Μετάβαση στο προφίλ μου' to='/profile' className='text-success'>
                        {props.profile.email}
                    </Link>
                    :
                    <Link title='Μετάβαση στο προφίλ του χρήστη' to={`/profile/${findUserFromStation(props.users, station).email}`}>
                        {findUserFromStation(props.users, station).email}
                    </Link>
                }
                </td>
                <td>{station.categories.length}</td>
                <td>{props.collections.filter(collection => collection.station_id === station.id).length}</td>
                <td>{station.is_active ? 'Ναι' : 'Οχι'}</td>
                <td>{station.privacy === 'public' ? 'Δημόσιος' : 'Ιδιωτικός'}</td>
                <td>{station.location}</td>
                <td>{station.description ? station.description.length > 10 ? `${station.description.substr(0, 10)}...` : station.description : '-'}</td>
                <td>{moment(station.created_at).format('dddd, D MMM YY')} ({moment(station.created_at).fromNow()})</td>
                <td>
                    {station.user_id === props.profile.id ?
                        <Link to={`/stations/${station.name}/edit`} title='Μετάβαση στον σταθμό μου' className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                        :
                        <Link to={`/stations/${station.name}/show`} title='Μετάβαση στον σταθμό του χρήστη' className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                    }
                    {station.user_id !== 1 && station.user_id !== props.profile.id &&
                    <React.Fragment>
                    <i title='Επεξεργασία'
                       onClick={() => props.onClickEdit(station.name, station.user_id, station.is_active, station.privacy)}
                       className='fa fa-edit mx-2 point'/>

                    <i title='Διαγραφή'
                       onClick={() => props.onClickDelete(station.name)}
                       className='fas fa-trash-alt mx-2 point'/>
                    </React.Fragment>
                    }
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default StationAllRender
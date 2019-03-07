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
            <th>Name</th>
            <th>Unique code</th>
            <th>Ownership</th>
            <th>Checked categories</th>
            <th>Measurements collections</th>
            <th>Active</th>
            <th>View</th>
            <th>Location</th>
            <th>Description</th>
            <th>Creation date</th>
            <th>Actions</th>
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
                    <Link title='Go to my profile' to='/profile' className='text-success'>
                        {props.profile.email}
                    </Link>
                    :
                    <Link title={`Go to user's profile`} to={`/profile/${findUserFromStation(props.users, station).email}`}>
                        {findUserFromStation(props.users, station).email}
                    </Link>
                }
                </td>
                <td>{station.categories.length}</td>
                <td>{props.collections.filter(collection => collection.station_id === station.id).length}</td>
                <td>{station.is_active ? 'Yes' : 'No'}</td>
                <td>{station.privacy === 'public' ? 'public' : 'private'}</td>
                <td>{station.location}</td>
                <td>{station.description ? station.description.length > 10 ? `${station.description.substr(0, 10)}...` : station.description : '-'}</td>
                <td>{moment(station.created_at).format('dddd, D MMM YY')} ({moment(station.created_at).fromNow()})</td>
                <td>
                    {station.user_id === props.profile.id ?
                        <Link to={`/stations/${station.name}/edit`} title='Go to my station' className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                        :
                        <Link to={`/stations/${station.name}/show`} title={`Go to user's station`} className='text-dark'>
                            <i className="fas fa-user-circle mx-2 point"/>
                        </Link>
                    }
                    {station.user_id !== 1 && station.user_id !== props.profile.id &&
                    <React.Fragment>
                    <i title='Edit'
                       onClick={() => props.onClickEdit(station.name, station.user_id, station.is_active, station.privacy)}
                       className='fa fa-edit mx-2 point'/>

                    <i title='Delete'
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
import React from 'react';
import moment from "moment/moment";
import {Link} from "react-router-dom";

let StationOwnRender = props => (
    <table className="table text-center">
        <thead className="text-primary">
        <tr>
            <th><i className="fas fa-broadcast-tower"/></th>
            {props.isAdmin &&
            <th>id</th>
            }
            <th>Name</th>
            <th>Unique code</th>
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
                <td className='border-right pr-2'>
                    {!!station.is_active ?
                        <i className="text-success fas fa-broadcast-tower"/>
                    :
                        <i className="text-danger fas fa-broadcast-tower"/>
                    }
                </td>
                {props.isAdmin &&
                <td>{station.id}</td>
                }
                <td>{station.name}</td>
                <td>{station.unique.length > 10 ? `${station.unique.substr(0, 10)}...` : station.unique}</td>
                <td>{station.categories.length}</td>
                <td>{props.collections.filter(collection => collection.station_id === station.id).length}</td>
                <td>{station.is_active ? 'Yes' : 'No'}</td>
                <td>{station.privacy === 'public' ? 'public' : 'private'}</td>
                <td>{station.location}</td>
                <td>{station.description ? station.description.length >10 ? `${station.description.substr(0, 10)}...` : station.description : '-'}</td>
                <td>{moment(station.created_at).format('dddd, D MMM YY')} ({moment(station.created_at).fromNow()})</td>
                <td>
                    <Link className='edit-fa' to={`/stations/${station.name}/edit`}><i title='Edit' className='fa fa-edit mx-2 point'/></Link>

                    <i title='Delete'
                       onClick={()=>props.onClickDelete(station.name)}
                       className='fas fa-trash-alt mx-2 point'/>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default StationOwnRender
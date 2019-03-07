import React from 'react';
import moment from "moment/moment";

let CategoryRender = props => (
    <table className="table text-center">
        <thead className="text-primary">
        <tr>
            {props.isAdmin &&
            <th>id</th>
            }
            <th>Name</th>
            <th>Min value</th>
            <th>Max value</th>
            <th>Symbol</th>
            <th>Creation date</th>
            {props.isAdmin &&
            <th>Actions</th>
            }
        </tr>
        </thead>
        <tbody>
        {props.categories.slice(props.firstIndex, props.lastIndex).map(category => (
            <tr key={category.id}>
                {props.isAdmin &&
                <td>{category.id}</td>
                }
                <td>{category.name}</td>
                <td>{parseFloat(category.minValue)}</td>
                <td>{parseFloat(category.maxValue)}</td>
                <td>{category.symbol}</td>
                <td>{moment(category.created_at).format('dddd, D MMM YY')} ({moment(category.created_at).fromNow()})</td>
                {props.isAdmin &&
                <td>
                    <i title='Edit'
                       onClick={() => props.onClickUpdate(category.name, category.symbol, category.minValue, category.maxValue)}
                       className='fa fa-edit mx-2 point'/>

                    <i title='Delete'
                       onClick={() => props.onClickDelete(category.name)}
                       className='fas fa-trash-alt mx-2 point'/>
                </td>
                }
            </tr>
        ))}
        </tbody>
    </table>
);

export default CategoryRender


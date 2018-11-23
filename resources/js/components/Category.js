import React from 'react';
import {connect} from 'react-redux';
import {setLang} from "../actions/Lang";

class Category extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="content">
                <div>
                    <h5 className="card-title text-center">Κατηγορίες</h5>
                    <p className="card-category">Handcrafted by our friends from
                        <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                    </p>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                <h3>Δημιουργία κατηγορίας</h3>
                            </div>
                            <div className="card-body">
                                <div>
                                    <input type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Προβολή όλων των κατηγοριών</h3>
                                <hr/>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className=" text-primary">
                                        <tr>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                Country
                                            </th>
                                            <th>
                                                City
                                            </th>
                                            <th className="text-right">
                                                Salary
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                Dakota Rice
                                            </td>
                                            <td>
                                                Niger
                                            </td>
                                            <td>
                                                Oud-Turnhout
                                            </td>
                                            <td className="text-right">
                                                $36,738
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Minerva Hooper
                                            </td>
                                            <td>
                                                Curaçao
                                            </td>
                                            <td>
                                                Sinaai-Waas
                                            </td>
                                            <td className="text-right">
                                                $23,789
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Sage Rodriguez
                                            </td>
                                            <td>
                                                Netherlands
                                            </td>
                                            <td>
                                                Baileux
                                            </td>
                                            <td className="text-right">
                                                $56,142
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Philip Chaney
                                            </td>
                                            <td>
                                                Korea, South
                                            </td>
                                            <td>
                                                Overland Park
                                            </td>
                                            <td className="text-right">
                                                $38,735
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Doris Greene
                                            </td>
                                            <td>
                                                Malawi
                                            </td>
                                            <td>
                                                Feldkirchen in Kärnten
                                            </td>
                                            <td className="text-right">
                                                $63,542
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Mason Porter
                                            </td>
                                            <td>
                                                Chile
                                            </td>
                                            <td>
                                                Gloucester
                                            </td>
                                            <td className="text-right">
                                                $78,615
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Jon Porter
                                            </td>
                                            <td>
                                                Portugal
                                            </td>
                                            <td>
                                                Gloucester
                                            </td>
                                            <td className="text-right">
                                                $98,615
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};
export default connect(mapStateToProps)(Category)
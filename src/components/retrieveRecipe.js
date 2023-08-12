import React, {Component} from 'react';
import axios from 'axios';
import DataTable from './data-table';
import { FormGroup , Box, TextField } from '@mui/material';

export default class RetrieveRecipe extends Component {
    constructor(props) {
        super(props)
        
        this.state = { recipeCollection: [] }
    }
    
    componentDidMount() {
        axios.get('http://localhost:4000/recipes/')
            .then((res) => {
                this.setState({ recipeCollection: res.data });
            }).catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.recipeCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }    

    render() {
        return (
            <div className="wrapper-recipes">
            <div className="container">
                <table className="table table-striped table-dark">
                    <thead className="thead-dark">
                        <tr>
                            <td>Name</td>
                            <td>Instructions</td>
                            <td>Ingredients</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.dataTable()}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
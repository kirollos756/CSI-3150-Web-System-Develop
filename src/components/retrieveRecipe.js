import React, {Component} from 'react';
import axios from 'axios';
import DataTable from './data-table';
import { FormGroup , Box, TextField , Button } from '@mui/material';

export default class RetrieveRecipe extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);

        this.state = { recipeCollection: [] }
    }
    
    // componentDidMount() {
    //     axios.get('http://localhost:4000/recipes/')
    //         .then((res) => {
    //             this.setState({ recipeCollection: res.data });
    //         }).catch(function (error) {
    //             console.log(error);
    //         })
    // }

    dataTable() {
        return this.state.recipeCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }    


    async onSubmit(e, res) {
        e.preventDefault()
        // const recipeObject = {
        //     name: this.state.name,
        //     instructions: this.state.instructions,
        //     ingredients: this.state.ingredients
        // };
        console.log('clicked');
        // axios.get('http://localhost:4000/recipes/read')
        // .then((res) => {
            
        //     this.setState({ recipeCollection: res.data });
        //     console.log('AXIOS CALL', this.recipeCollection ); 
        // }).catch(function (error) {
        //     console.log(error);
        // })
        // axios.post('http://localhost:4000/recipes/create', recipeObject)
        //     .then((res) => {
        //         console.log(res.data)
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // this.setState({ name: '', instructions: '', ingredients: ''})

        try {
            const response = await axios.get('http://localhost:4000/recipes/read');
            const lst = response.data;
            console.log('Response', lst);
            this.setState({ recipeCollection: lst });
            // this.setState({ name: '', instructions: '', ingredients: ''})
            console.log('STATE', this.state);
            return lst;
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div className="wrapper-recipes">

                    <div className="form-group">
                        <Button value="Read Recipes" variant="contained" onClick={this.onSubmit} sx={{
        backgroundColor: '#f1b341',
        color: 'white',
        '&:hover': {
            backgroundColor: '#15466b', // Darker color for hover effect
        },
    }}> Submit </Button>
                    </div>
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
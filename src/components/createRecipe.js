import React, {Component} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FormGroup , Box, TextField} from '@mui/material';

export default class CreateRecipe extends Component {
    constructor(props) {
        super(props)
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeInstructions = this.onChangeInstructions.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            instructions: '',
            ingredients: ''
        }
    }
    
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeInstructions(e) {
        this.setState({ instructions: e.target.value })
    }
    
    onChangeIngredients(e) {
        this.setState({ ingredients: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const recipeObject = {
            name: this.state.name,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients
        };

        axios.post('http://localhost:4000/recipes/create', recipeObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({ name: '', instructions: '', ingredients: ''})
    }

    render() {
        return (
            <div className="wrapper">
                <Box autoComplete="off" 
                sx={{
                    '& .MuiTextField-root': { m: 3, width: '25ch' },
                  }}
            
                noValidate>
                <FormGroup onSubmit={this.onSubmit}>
                    {/* <div className="form-group">
                        <label>Add Recipe Name</label>
                        
                    </div> */}
                    <div className="form-group">
                        {/* <label>Add Recipe Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeName} className="form-control" /> */}
                        <TextField required id="outlined-required margin-normal" value={this.state.name} onChange={this.onChangeName} label="Recipe Name"/>
                    </div>
                    <div className="form-group">
                        {/* <label>Add Recipe Instructions</label>
                        <input type="text" value={this.state.instructions} onChange={this.onChangeInstructions} className="form-control" /> */}
                        <TextField required id="outlined-required margin-normal" value={this.state.instructions} onChange={this.onChangeInstructions} label="Recipe Instructions"/>
                    </div>
                    <div className="form-group">
                        {/* <label>Add Recipe Ingredients</label>
                        <input type="text" value={this.state.ingredients} onChange={this.onChangeIngredients} className="form-control" /> */}
                        <TextField required id="outlined-required margin-normal" value={this.state.ingredients} onChange={this.onChangeIngredients} label="Recipe Ingredients"/>
                    </div>
                    <div className="form-group">
                        <Button type="submit" value="Create recipe" variant="contained" onClick={this.onSubmit} style={{ backgroundColor: '#f1b341', color: 'white' }}> Submit </Button>
                    </div>
                </FormGroup>
                </Box>
            </div>
        )
    }
}
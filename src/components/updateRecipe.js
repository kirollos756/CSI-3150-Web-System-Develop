import React, {Component} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FormGroup , Box, TextField} from '@mui/material';

export default class UpdateRecipe extends Component {
    constructor(props) {
        super(props)
        
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeInstructions = this.onChangeInstructions.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            name: '',
            instructions: '',
            ingredients: ''
        }
    }
    
    onChangeID(e) {
        this.setState({ id: e.target.value})
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

    async onSubmit(e) {
        e.preventDefault()
        const recipeID = this.state.id;

        const response = await axios.get(`http://localhost:4000/recipes/edit/${recipeID}`)
            .then((res) => {
                this.setState({ name: res.data.name, instructions: res.data.instructions , ingredients: res.data.ingredients })
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        console.log('response', response);
        console.log('state', this.state);
        
    }


    async onUpdate(e) {
        e.preventDefault()

        const recipeID = this.state.id;

        const recipeObject = {
            name: this.state.name,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients
        };

        const response = await axios.put(`http://localhost:4000/recipes/update/${recipeID}`, recipeObject)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });

        console.log('response', response);
        console.log('state', this.state);
    }

    render() {
        return (
            <div className="wrapper">
                <Box autoComplete="off" 
                sx={{
                    '& .MuiTextField-root': { m: 3, width: '25ch' },
                  }}
            
                noValidate>
                <div className="form-group">
                    
                    <TextField required id="outlined-required margin-normal" value={this.state.id} onChange={this.onChangeID} label="Recipe ID"/>
                    <Button value="searchID" variant="contained" onClick={this.onSubmit}> Search ID </Button>
                </div>
                <FormGroup onSubmit={this.onUpdate}>
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
                        <Button type="submit" value="Create recipe" variant="contained" onClick={this.onUpdate}> Update Recipe </Button>
                    </div>
                </FormGroup>
                </Box>
            </div>
        )
    }
}
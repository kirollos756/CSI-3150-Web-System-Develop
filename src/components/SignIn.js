import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FormGroup, Box, TextField, Typography } from '@mui/material';
import App from "../App.js";


export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            success: false,
            incorrectPassword: false, // Added state for incorrect password
        };
        // this.props.userId = userId;
        console.log('props', props);
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        const userObject = {
            username: this.state.username,
            password: this.state.password,
        };

        console.log('Submitting sign-in:', userObject); // Log the userObject being sent to the server
        await axios.post('http://localhost:4000/user/signin', userObject)
            .then((res) => {
                console.log('Server response:', res.data); // Log the response from the server
                console.log('User ID:', res.data.userId);
                if (res.data.userId === 0) {
                    this.setState({ success: false, incorrectPassword: true });
                } else if (res.data.userId) {
                    this.setState({ success: true, incorrectPassword: false , userId: res.data.userId});
                } else {
                    this.setState({ success: false, incorrectPassword: true });
                }
            })
            .catch((error) => {
                console.log('Error occurred during sign-in:', error); // Log any error that occurs
            });


        this.setState({ username: '', password: '' });
        // const user = this.state.username;
        // this.props.userId = {user};

        // console.log("here "+this.props.accountCreated);
        console.log('props 2', this.props);
        console.log('props 2', this.state);
        // console.log('response', response);
        
    }

    render() {
        return (
            <div className="wrapper">
                <Box
                    autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 3, width: '25ch' },
                    }}
                    noValidate
                >
                    
                    {!this.state.success ? (
                        <FormGroup onSubmit={this.onSubmit}>
                            {this.state.incorrectPassword && (
                                <Typography variant="body2" color="error">
                                    Unsuccessful Sign In. Please try again.
                                </Typography>
                            )}
                            
                            {this.props.accountCreated && (
                                <Typography variant="body2" color="success">
                                    Account successfully created! Please login.
                                </Typography>
                            )}


                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-required margin-normal"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    label="Username"
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-required margin-normal"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    label="Password"
                                    type="password"
                                />
                            </div>
                            <div className="form-group">
                                <Button
                                    type="submit"
                                    value="Sign In"
                                    variant="contained"
                                    onClick={this.onSubmit}
                                >
                                    Sign In
                                </Button>
                            </div>
                            <Button onClick={this.props.togglePage}>Don't have an account? Register</Button>
                        </FormGroup>
                    ) : (
                        <App userId={this.state.userId} />
                    )}
                </Box>
            </div>
        );
    }
}



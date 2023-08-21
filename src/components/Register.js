import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { FormGroup, Box, TextField, Typography } from '@mui/material';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      usertaken: false,

    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userObject = {
      username: this.state.username,
      password: this.state.password,
    };


    
    axios
      .post('http://localhost:4000/user/register', userObject) // Update the URL to match your backend route for user registration
      .then((res) => {
        if (res.data.userId === 1) {
          console.log('Name taken');
          this.setState({ usertaken: true });
        }
        else {
          console.log(res.data);
          console.log('User registered successfully, name was good');
          this.setState({ accountCreated: true, usertaken: false });
          this.props.togglePage();
          this.props.handleRegistrationSuccess();
        }
      })
      .catch((error) => {
        console.log("Here2")
        console.log(error);
      });

    this.setState({ username: '', password: '' });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.onSubmit(e); // Call the onSubmit function
    if (!this.state.usertaken) {
      //this.props.togglePage(); // Call the togglePage function
    }
  };

  render() {
    return (
      <div className="wrapper">
        <Box
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { m: 3, width: '25ch' },
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center'}}
          noValidate
        >
          {this.state.usertaken && (
            <Typography variant="body2" color="error">
              UserName is taken, Try again.
            </Typography>
          )}
          <FormGroup onSubmit={this.onSubmit}>
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
              <Box sx={{display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'}}>
              <Button
                type="submit"
                value="Register"
                variant="contained"
                onClick={this.handleFormSubmit}
                sx={{ backgroundColor: 'rgb(30,80,123)' }}
              >
                Register
              </Button>
              </Box>
            </div>
          </FormGroup>
        </Box>
        <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'center', p:1}}>
        <Button onClick={this.props.togglePage} sx={{ color: 'rgb(30,80,123)' }}>Already have an account? Click to Log in!</Button>
        </Box>
      </div>
    );
  }
}

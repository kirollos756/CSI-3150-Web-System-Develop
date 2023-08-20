import React, { Component } from 'react';
import Register from './components/Register'; // Import your Register component
import SignIn from './components/SignIn'; // Import your SignIn component
import { Box } from '@mui/material';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterPage: true,
            accountCreated: false, // Change this to accountCreated
        };
    }

    handleRegistrationSuccess = () => {
        this.setState({ accountCreated: true, isRegisterPage: false }); // Change this to accountCreated
    };

    render() {
        return (
            <Box sx={{display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'}}>
            
                {this.state.isRegisterPage ? (
                    <Register
                        togglePage={() => this.setState({ isRegisterPage: false })}
                        handleRegistrationSuccess={this.handleRegistrationSuccess}
                    />
                ) : (
                    <SignIn
                        togglePage={() => this.setState({ isRegisterPage: true })}
                        accountCreated={this.state.accountCreated}
                        userId={''}
                    />
                )}
              
            </Box>
        );
    }
}




export default AuthPage;

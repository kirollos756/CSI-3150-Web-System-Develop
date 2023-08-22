import React, { Component } from 'react';
import Register from './components/Register'; // Import your Register component
import SignIn from './components/SignIn'; // Import your SignIn component
import { Box , Typography, CssBaseline,
    ThemeProvider,
    createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
      background: {
        default: "#a6c1d9", // Set your desired background color
      },
    },
});

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
            <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Apply a baseline of CSS resets */}
            <Box >

            <Typography variant='h1'
            fontFamily={"Rubik"}
            sx={{display: 'flex', alignContent: 'center', justifyContent: 'center' , color: 'rgb(30,80,123)', paddingTop: '50px' }} 
            gutterBottom
            >
                ChefBot.Ai
            </Typography>
            
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
            </ThemeProvider>
        );
    }
}




export default AuthPage;

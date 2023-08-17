import React, { Component } from 'react';
import Register from './components/Register'; // Import your Register component
import SignIn from './components/SignIn'; // Import your SignIn component

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
            <div>
                {this.state.isRegisterPage ? (
                    <Register
                        togglePage={() => this.setState({ isRegisterPage: false })}
                        handleRegistrationSuccess={this.handleRegistrationSuccess}
                    />
                ) : (
                    <SignIn
                        togglePage={() => this.setState({ isRegisterPage: true })}
                        accountCreated={this.state.accountCreated}
                    />
                )}
              
            </div>
        );
    }
}




export default AuthPage;

import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';


import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password} = this.state;        


        emailSignInStart(email, password);
        // try { //ya no se necesita Saga lo manejara
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({ email:'', password:''});
        // } catch (error) {
        //     console.log(error);
        // }       
    }

    handleChange = event => {
        const { value, name } = event.target;
        
        this.setState({ [name]: value })
    }

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        label='email'
                        handledChange={this.handleChange}
                        required />

                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        label='password'
                        handledChange={this.handleChange}
                        required />


                    <div className='buttons'>
                        <CustomButton type='submit'>SIGN IN</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                            SIGN IN WITH GOOGLE
                        </CustomButton>
                    </div>

                </form>

            </div>
        );
    }
}

const mapDispachToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null,mapDispachToProps)(SignIn);
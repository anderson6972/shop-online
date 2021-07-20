import React, {useState} from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';


import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {   
    const [userCredentials, setCredential]  = useState({email: '', password: ''})

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
                        
        emailSignInStart(email, password);
        // try { //ya no se necesita Saga lo manejara
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({ email:'', password:''});
        // } catch (error) {
        //     console.log(error);
        // }       
    }

    const handleChange = event => {
        const { value, name } = event.target;
        
        setCredential({...userCredentials, [name]: value })
    }
            

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                <FormInput
                        name='email'
                        type='email'
                        value={email}
                        label='email'
                        handledChange={handleChange}
                        required />

                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        label='password'
                        handledChange={handleChange}
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

const mapDispachToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null,mapDispachToProps)(SignIn);
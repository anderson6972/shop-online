import React, {useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.action';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handledSubmit = async event => {
        event.preventDefault();        

        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }

        signUpStart({displayName, email, password});

        // try {
            // NOTA: ahora se realiza en el saga
            // const { user } = await auth.createUserWithEmailAndPassword(email, password);
            // await createUserProfileDocument(user, { displayName });
            // this.setState({
            //     displayName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: ''
            // });

        // } catch (error) {
        //     console.log(error);
        // }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({...userCredentials, [name]: value });
    }

    
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handledSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />

                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />

                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    />

                    <CustomButton type='submit'>SING UP</CustomButton>
                </form>
            </div>
        )
    
}

const mapDispatchToProps = dispacth => ({
    signUpStart: userCredentials => dispacth(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);
import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button className={
        `${inverted ? 'inverted' :'' }
         ${isGoogleSignIn ? 'google-sign-in' :'' } 
         custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;

/** 
 * esto es usando css pero no me funciona unos estilos
 * import React from 'react';

import { CustomButtonContainer } from './custom-buttom.styles';

const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;
 * 
*/
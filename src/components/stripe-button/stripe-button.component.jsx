import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) =>{
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51IuqBJIiC0Mmk1gIBzcrwq9oljRZMmXFprZwiW3SaiNKYCrtv03P0QH8dvZfTCec2Mi2WtBTOdRKQAQSh77bT68x007Lgcv1O4';

    const onToken= token =>{
        console.log(token);
        alert('Payment Succeful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clotinihg Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
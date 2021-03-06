import cardItemTypes from '../cart/cart.types';
import { addItemToCart,  remoteItemFromCart} from './card.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case cardItemTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden: !state.hidden
            };
        case cardItemTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload),
            };

        case cardItemTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems: remoteItemFromCart(state.cartItems, action.payload),
            };

        case  cardItemTypes.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id  !== action.payload.id)
            };
        case cardItemTypes.CLEAR_CART:
            return{
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
}

export default cartReducer;
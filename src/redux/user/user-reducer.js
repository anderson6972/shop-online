import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case UserActionTypes.SIGN_IN_SUCCESS :        
        console.log('success------->'+action)          
            return{
                ...state,
                currentUser: action.payload,
                error: null
            }
        
        case UserActionTypes.SIGN_IN_FAILURE:        
            return{
                ...state,
                error: action.payload
            }
        default:
            console.log('no trajo------->'+action)   
            return state;
    }
}

export default userReducer;
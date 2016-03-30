import { SET_SIGNED_OUT, SET_SIGNED_IN } from './actions';

const initialState = {
    signedIn: false,
    user: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGNED_IN:
            return {
                ...state,
                signedIn: true,
                user: action.user
            };

        case SET_SIGNED_OUT:
            return initialState;

        default:
            return state;
    }
};

export default appReducer;
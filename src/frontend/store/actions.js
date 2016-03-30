export const SET_SIGNED_IN = 'SET_SIGNED_IN';
export const SET_SIGNED_OUT = 'SET_SIGNED_OUT';


export const setSignedIn = (user) => ({
    type: SET_SIGNED_IN,
    user
});

export const setSignedOut = () => ({
    type: SET_SIGNED_OUT
});
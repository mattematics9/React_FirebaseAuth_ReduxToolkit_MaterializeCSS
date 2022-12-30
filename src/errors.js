export const getErrorText = (errorCode) => {
    switch(errorCode){
        case 'auth/user-not-found':
            return 'Email Not Found.';
        case 'auth/wrong-password':
            return 'Incorrect Password.';
        case 'auth/email-already-in-use':
            return 'Email Taken.  Try a different email.';
        case 'auth/invalid-email':
            return 'Invalid Email';
        case 'auth/popup-closed-by-user':
            return 'Sign In Canceled';
        case'auth/weak-password':
            return 'Weak Password.  Try Again.'
        default:
            return errorCode;
    }
}
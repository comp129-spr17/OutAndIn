export function usersCreateSuccess(username) {
    return {
        type: 'USERS_CREATE_SUCCESS',
        username
    }
}

export function usersCreate(username){
    return (dispatch) => {
        dispatch(usersCreateSuccess(username));
    };
}

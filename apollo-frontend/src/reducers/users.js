export function users(state={}, action){
    console.log("action :" + JSON.stringify(action));
    switch(action.type){
        case 'USERS_CREATE_SUCCESS':
            return action.username;
        default:
            return state;
    }
}

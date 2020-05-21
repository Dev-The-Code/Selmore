import {SIGNED_IN} from '../constant/authentication';

export function logUser( { email, password }){
    const action ={
        type : SIGNED_IN,
        email
    }
    return action;
}
import {SIGNED_IN} from '../constant/authentication';

export function logUser( { email, password }){
    // console.log(email, password, 'is main kia aaya')
    const action ={
        type : SIGNED_IN,
        email
    }
    return action;
}
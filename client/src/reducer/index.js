import { SIGNED_IN } from '../constant/authentication';
let user = {
    email: null,
    password: null,
}

export default (state = user, action) => {
    const { email, type } = action;
    switch (type) {
        case SIGNED_IN:
            user = {
                email
            }
            return user;
        default:
            return state
    }
}
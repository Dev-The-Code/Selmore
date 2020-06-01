import { AsyncStorage } from '@callstack/async-storage'

// const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://salmore.herokuapp.com';
const BASE_URL = 'https://selmoremedia.com';

const headersFor = (token) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': "application/json"
    };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return headers;
}

const credentials = "same-origin";

const handleErrors = (response) => {
    return response.json().then(responseData => {
        if (responseData.errors) {
            if (responseData.errors.indexOf('Invalid token') !== -1) {
                return AsyncStorage.removeItem('auth_token').then(() => {
                    let err = Error('Invalid auth token')
                    // Sentry.captureException(err)
                    throw err
                })
            } else {
                let err = Error(responseData.errors.join('. ') + '.')
                //Sentry.captureException(err)
                throw err
            }
        }
        return responseData

    });
}


const hitEndpoint = (method, endpoint, token, body) => {
    let headers = headersFor(token)
    let url = [BASE_URL, endpoint].join('/')


    return fetch(url, { method, credentials, headers, body }).then((response) => {
        return handleErrors(response)
    }).catch((err) => {
        if (err.message === 'Network request failed')
            //Sentry.captureException(err)
            throw err
    });
}

export const HttpUtils = {
    get: (endpoint, token) => hitEndpoint('GET', endpoint, token),
    delete: (endpoint, token) => hitEndpoint('DELETE', endpoint, token),
    // delete: (endpoint, data, token) => {
    //     let body = JSON.stringify(data)
    //     hitEndpoint('DELETE', endpoint, token, body)
    // },
    post: (endpoint, data, token) => {
        let body = JSON.stringify(data)
        return hitEndpoint('POST', endpoint, token, body)
    },
    put: (endpoint, data, token) => {
        let body = JSON.stringify(data)
        return hitEndpoint('PUT', endpoint, token, body)
    }
}

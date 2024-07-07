const host = "http://localhost:8080"
const prefix = host + '/api/v1';

export async function get(url, params = {}) {
    const response = await fetch(prefix + url, {
        method: 'GET',
        params,
    });
    return response.json();
}

export async function post(url, data = {}) {
    console.log("data", data, JSON.stringify(data))
    const response = await fetch(prefix + url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
    console.log("response", response)
    return response;
}

export async function put(url, data = {}) {
    const response = await fetch(prefix + url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function delete_call(url, params = {}) {
    const response = await fetch(prefix + url, {
        method: 'DELETE',
        params,
    });
    return response.json();
}

export async function auth_get_token(data = {}) {
    const AUTH_API_URL = "/auth";
    return await post(AUTH_API_URL, data)
}

export async function register_user(data = {}) {
    const AUTH_API_URL = "/auth/register";
    return await post(AUTH_API_URL, data)
}


export default {
    get,
    post,
    put,
    delete_call,
    auth_get_token,
    register_user
};
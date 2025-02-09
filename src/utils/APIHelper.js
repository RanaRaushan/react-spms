const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const PREFIX = SERVER_HOST + import.meta.env.VITE_API_PREFIX;

export async function get(url, params = {}, requireAuth=false) {
    try {
        const response = await fetch(PREFIX + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
            params,
        });
        return response.json();
    } catch (response) {
        console.log("response error", response)
        console.log(response.status, response.statusText);
    }
}

export async function post(url, data = {}, requireAuth=false) {
    console.log("data", data, JSON.stringify(data))
    try {
        const response = await fetch(PREFIX + url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return response.json();
    } catch (response) {
        console.log("response error", response)
        console.log(response.status, response.statusText);
    }
}

export async function put(url, data = {}) {
    const response = await fetch(PREFIX + url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function delete_call(url, params = {}) {
    const response = await fetch(PREFIX + url, {
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
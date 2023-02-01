import axios from 'axios';

const fakeStoreApiURL = 'https://fakestoreapi.com/products/';

const FakeStoreApi = axios.create({
    baseURL: fakeStoreApiURL
})

const Api = axios.create({
    baseURL: import.meta.env.VITE_ONLINE_URL || 'http://localhost:3000/api/'
});

Api.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (!error.response) {
            console.error("Problem connecting to the server...");
        }
        return Promise.reject(error)
    }
)

export { FakeStoreApi, Api };
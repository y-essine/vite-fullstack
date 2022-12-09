import axios from 'axios';

const fakeStoreApiURL = 'https://fakestoreapi.com/products/';

const FakeStoreApi = axios.create({
    baseURL: fakeStoreApiURL
});

const Api = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export { FakeStoreApi, Api };
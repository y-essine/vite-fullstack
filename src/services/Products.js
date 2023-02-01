import { FakeStoreApi } from '@/services/Api';

export default {
    getByCategory(params) {
        return FakeStoreApi.get('/category/' + params);
    }
}
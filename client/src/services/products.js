import { FakeStoreApi } from '@/services/api';

export default {
    getByCategory(params) {
        return FakeStoreApi.get('/category/' + params);
    }
}
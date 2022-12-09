import { Api } from '@/services/Api';

export default {
    getTodos() {
        return Api.get();
    }
}
import { createStore } from "vuex";

import routing from "@/store/modules/routing";
import user from "@/store/modules/user";
import products from "@/store/modules/products";
import todos from "@/store/modules/todos";

const store = createStore({
    modules: {
        routing,
        user,
        products,
        todos,
    },
})

export default store;
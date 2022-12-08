import { createStore } from "vuex";

import user from "@/store/modules/user";
import products from "@/store/modules/products";
import todos from "@/store/modules/todos";

const store = createStore({
    modules: {
        user,
        products,
        todos,
    },
})

export default store
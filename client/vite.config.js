import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 5173
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
})

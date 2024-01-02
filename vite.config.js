import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    server: {
        host:'192.168.100.2'
    },
    plugins: [
        vue(),
        laravel({
            input: [
                'resources/css/_icons.css',
                'resources/css/app.css',
                'resources/css/bootstrap.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
});

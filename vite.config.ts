import vue from '@vitejs/plugin-vue';

export default require('vite').defineConfig({
    plugins: [vue()],
    server: {
        host: true
    }
});

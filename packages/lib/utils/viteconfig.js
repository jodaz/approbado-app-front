import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        build: {
            outDir: 'dist',
        },
        define: {
            'process.env': {
                ...env,
                "WEB": true,
            },
        },
        plugins: [
            react(),
            svgr({ svgrOptions: { icon: true } }),
        ],
    };
});

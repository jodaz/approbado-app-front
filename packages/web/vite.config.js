import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    build: {
        outDir: 'build',
    },
    define: {
        'process.env': {
            "WEB": true
        },
    },
    plugins: [
        react(),
        svgr({ svgrOptions: { icon: true } }),
    ],
  };
});

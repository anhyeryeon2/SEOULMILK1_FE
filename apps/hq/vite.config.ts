import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/hq/home',
  server: {
    port: 5175
  },
  root: __dirname,
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@store': path.resolve(__dirname, '../../packages/store/src'),
      '@types': path.resolve(__dirname, '../../packages/types/src'),
      '@common': path.resolve(__dirname, '../../packages/common')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});

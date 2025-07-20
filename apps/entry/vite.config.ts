import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, '../../packages/common'),
      '@hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@store': path.resolve(__dirname, '../../packages/store/src'),
      '@icon': path.resolve(__dirname, './src/Icon')
    }
  }
});

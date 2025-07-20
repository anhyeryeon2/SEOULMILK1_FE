import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // 패키지 내부 컴포넌트
    '../../packages/common/**/*.{js,ts,jsx,tsx}', // (선택) 다른 패키지
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
export default config;

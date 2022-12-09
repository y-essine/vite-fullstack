module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  content: [],
  theme: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f0d0a',
        cream: '#ede0c8',
        coral: '#d9704d',
        mint: '#7dd3c0',
        surface: '#1a1815',
        border: '#2a2820',
      },
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

module.exports = config

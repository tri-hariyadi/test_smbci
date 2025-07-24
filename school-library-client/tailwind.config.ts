const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0A0A0A',
        'dark-secondary': '#181818',
        'blue-primary': '#1E3A8A'
      },
      backgroundColor: {
        overlay: 'rgba(56,71,83,0.6)'
      },
      borderWidth: {
        1: '10px'
      },
      fontFamily: {
        'inter-bold': ['Inter-Bold', 'sans-serif'],
        'inter-italic': ['Inter-Italic', 'sans-serif'],
        'inter-medium': ['Inter-Medium', 'sans-serif'],
        'inter-regular': ['Inter-Regular', 'sans-serif'],
        'inter-semibold': ['Inter-SemiBold', 'sans-serif'],
        'inter-extra-bold': ['Inter-ExtraBold', 'sans-serif'],
        'inter-bold-italic': ['Inter-BoldItalic', 'sans-serif']
      }
    }
  }
};

export default config;

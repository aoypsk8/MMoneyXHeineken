module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg:'0.5rem',
        xl: '1rem', // Example of extending with a custom size
      },
    },
  },

  plugins: [],
};

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'App 4 Demo'
    }
  }
}
module.exports = {
  transpileDependencies: [
    'vuetify',
    '/[\\/]node_modules[\\/]tiptap.*/'
  ],

  pluginOptions: {
    i18n: {
      locale: 'si',
      fallbackLocale: 'si',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}

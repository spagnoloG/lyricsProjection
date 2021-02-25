import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#264653',
        secondary: '#457b9d',
        accent: '#4e4e50',
        error: colors.red.accent3,
        tercinary: '#a8dadc'
      },
      dark: {
        primary: '#264653',
        secondary: '#457b9d',
        accent: '#457b9d',
        error: colors.red.accent3,
        tercinary: '#264653'
      },
      options: {
        themeCache: {
          get: key => localStorage.getItem(key),
          set: (key, value) => localStorage.setItem(key, value)
        }
      }
    }
  }
})

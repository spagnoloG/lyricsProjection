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
        primary: '#379683',
        secondary: '#05386B',
        accent: '#EDF5E1',
        error: colors.red.accent3
      },
      dark: {
        primary: '#05386B'
      }
    }
  }
})

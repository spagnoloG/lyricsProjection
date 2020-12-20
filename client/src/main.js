import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import VueOffline from 'vue-offline'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import i18n from './i18n'

Vue.use(VueOffline)

Vue.use(VueI18n)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})

const socket = io('http://' + window.location.hostname + ':3000')

Vue.use(VueSocketIOExt, socket, { store })

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

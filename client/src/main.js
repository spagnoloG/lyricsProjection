import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

const socket = io('http://' + window.location.hostname + ':3000')

Vue.use(VueSocketIOExt, socket, { store })

// Register a global custom directive called v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: (el) => {
    // Focus the element
    el.focus()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

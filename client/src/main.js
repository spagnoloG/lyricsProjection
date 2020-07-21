import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "@/store/store.js";

// Register a global custom directive called v-focus
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    // Focus the element
    el.focus();
  }
});

// MULTIPLE USERS ADDING LYRICS:)
// setInterval(()=> {
//   store.dispatch("lyric/fetchLyrics");
// }, 3000)

//Use bootstrap library for styles
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export const eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

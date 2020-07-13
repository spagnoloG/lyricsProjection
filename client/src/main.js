import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//Use bootstrap library for styles
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export const eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

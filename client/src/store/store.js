import Vue from "vue";
import Vuex from "vuex";
import * as lyric from "@/store/modules/lyric.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lyric,
    notification
  }
});

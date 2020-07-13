import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AddLyrics from "./views/AddLyrics.vue";
import Project from "./views/Project.vue";
import List from "./views/List.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/list",
      name: "list",
      component: List
    },
    {
      // Pospidiri to komponento in utvari nov route za dodaj pesem
      path: "/project",
      name: "project",
      component: Project
    },
    {
      path: "/add",
      name: "add",
      component: AddLyrics
    }
     

  ]
});

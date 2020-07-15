import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AddLyrics from "./views/AddLyrics.vue";
import Project from "./views/Project.vue";
import List from "./views/List.vue";
import EditLyric from "./views/EditLyric.vue";

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
      path: "/project/:id",
      name: "project",
      component: Project
    },
    {
      path: "/add",
      name: "add",
      component: AddLyrics
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditLyric
    },
    {
      path: "*",
      name: "Error404",
      component: () => import('./views/Error404')
    }
  ]
});

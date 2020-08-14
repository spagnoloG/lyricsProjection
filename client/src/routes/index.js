import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import AddLyric from '../views/addLyric/AddLyric.vue'
import ListLyrics from '../views/listLyrics/ListLyrics.vue'
import ListPsalms from '../views/listPsalms/ListPsalms.vue'
import Playlists from '../views/playlists/Playlists.vue'
import Project from '../views/project/Project.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-lyric',
    name: 'AddLyric',
    component: AddLyric
  },
  {
    path: '/list-lyrics',
    name: 'ListLyrics',
    component: ListLyrics
  },
  {
    path: '/list-psalms',
    name: 'ListPsalms',
    component: ListPsalms
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
  },
  {
    path: '/add-psalm',
    name: 'AddPsalm',
    component: () => import('../views/addPsalm/AddPsalm.vue')
  },
  {
    path: '/options',
    name: 'Options',
    component: () => import('../views/options/Options.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/edit-lyric/:id',
    name: 'EditLyric',
    component: () => import('../views/editLyric/Edit.vue')
  },
  {
    path: '/edit-psalm/:id',
    name: 'EditPsalm',
    component: () => import('../views/editPsalm/Edit.vue')
  },
  {
    path: '/remote',
    name: 'Remote',
    component: () => import('../views/remote/Remote.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

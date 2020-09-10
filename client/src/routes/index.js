import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import AddLyric from '../views/addLyric/AddLyric.vue'
import ListLyrics from '../views/listLyrics/ListLyrics.vue'
import ListPlaylists from '../views/playlists/ListPlaylists.vue'
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
    path: '/list-playlists',
    name: 'ListPlaylists',
    component: ListPlaylists
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project
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
    path: '/edit-playlist/:id',
    name: 'EditPlaylist',
    component: () => import('../views/playlists/components/EditPlaylist.vue')
  },
  {
    path: '/display',
    name: 'Display',
    component: () => import('../views/display/Display.vue')
  },
  {
    path: '/remote',
    name: 'Remote',
    component: () => import('../views/remote/Remote.vue')
  },
  {
    path: '/print',
    name: 'Print',
    component: () => import('../views/print/Print.vue')
  },
  {
    path: '/404',
    component: () => import('../views/notFound/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

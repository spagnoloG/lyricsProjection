<template>
  <v-app>
      <navigation-drawer></navigation-drawer>>

      <navbar></navbar>

    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './views/globalComponents/Navbar.vue'
import NavigationDrawer from './views/globalComponents/NavigationDrawer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    NavigationDrawer
  },
  data: () => ({
    //
  })
}
</script>

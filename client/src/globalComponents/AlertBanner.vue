<template>
  <div class="banners">
    <!-- Error banner -->
    <v-banner v-if="alert.type === 'error' && alert.show === true">
      <v-avatar slot="icon" color="red darken-2" size="50">
        <v-icon icon="mdi-alert-circle" color="white">
          mdi-alert-circle
        </v-icon>
      </v-avatar>
      {{ alert.message }}
      <template v-slot:actions>
        <v-btn text color="primary" @click="closeAlert">Close</v-btn>
      </template>
    </v-banner>
    <!-- Success banner -->
    <v-banner v-if="alert.type === 'success' && alert.show === true">
      <v-avatar slot="icon" color="green accent-3" size="50">
        <v-icon icon="mdi-check-underline-circle" color="white">
          mdi-check-underline-circle
        </v-icon>
      </v-avatar>
      {{ alert.message }}
      <template v-slot:actions>
        <v-btn text color="primary" @click="closeAlert">Close</v-btn>
      </template>
    </v-banner>
    <!-- Ethernet connection failure -->
    <v-banner v-if="isOffline">
      <v-avatar slot="icon" color="blue" size="50">
        <v-icon icon="mdi-wifi-strength-1-alert" color="white">
          mdi-wifi-strength-1-alert
        </v-icon>
      </v-avatar>
       No internet connection! Check your network settings.
      <template v-slot:actions>
      </template>
    </v-banner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AlertBanner',
  computed: {
    ...mapGetters({
      alert: 'appState/getAlert'
    })
  },
  methods: {
    closeAlert () {
      this.$store.dispatch('appState/hideAlert')
    }
  }
}
</script>

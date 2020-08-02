<template>
  <div>
    <!-- Show add new category -->
    <div>
      <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-container>
        <v-card-title class="headline">Dodaj novo kategorijo</v-card-title>
        <form v-on:submit.prevent>
          <!-- v-on:keyup.enter="nextOne" -->
          <v-text-field
            v-model="category"
            label="Vnesi kategorijo"
            class="black--text"
            outlined
            required
          ></v-text-field>
        </form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Prekliči</v-btn>
          <v-btn color="green darken-1" text @click="saveCategory">Shrani</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </div>
    <!-- List categories -->
  <div>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="white--text secondary">
      Kategorije Psalmov
      <v-spacer></v-spacer>

      <v-btn
      color="primary"
      class="text--primary"
      @click="dialog = true"
      fab small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text
      class="pt-4"
    >Spodaj so navedene vse kategorije Psalmov</v-card-text>

    <v-divider></v-divider>

      <v-virtual-scroll
      :items="items"
      :item-height="50"
      height="300"
    >
      <template v-slot="{ item }">
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar
            color="secondary"
              size="56"
              class="white--text"
            >
              {{ item.initial }}
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              depressed
              small
              @click="deleteCategory(item.name)"
            >
              Izbriši
              <v-icon
                color="secondary"
                right
              >
                mdi-delete
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-card>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      category: ''
    }
  },
  computed: {
    ...mapGetters({
      categories: 'psalm/getCategories'
    }),
    items () {
      return Array.from(this.categories, c => {
        return {
          name: c,
          initial: c[0]
        }
      })
    }
  },
  methods: {
    deleteCategory (category) {
      this.$store.dispatch('psalm/deleteCategory', category)
    },
    saveCategory () {
      this.$store.dispatch('psalm/addNewCategory', this.category)
      this.dialog = false
    }
  }
}
</script>

<style>
</style>

<template>
  <div>
    <h1>{{'profile.title' | localize}}</h1>

    <v-divider class="mb-4"></v-divider>

    <v-col cols="12" xs="12" sm="6">
      <v-form v-model="isValid" @submit.prevent="submitHandler">
        <v-text-field
          :label="'profile.name' | localize"
          :rules="nameRules"
          name="name"
          prepend-icon="mdi-format-letter-case"
          type="name"
          v-model.trim="name"
          required
        ></v-text-field>
        
        <v-select
          :items="langs"
          :label="'shared.selectLang' | localize"
          name="locale"
          prepend-icon="mdi-translate"
          item-text="name"
          item-value="val"
          v-model="locale"
          required
        ></v-select>

        <v-btn
          color="success"
          type="submit"
        >
          <v-icon left>mdi-pencil</v-icon>
          {{'shared.update' | localize}}
        </v-btn>
      </v-form>
    </v-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import localizeFilter from "@/filters/localize.filter"

export default {
  name: 'profile',
  metaInfo() {
    return {
      title: this.$title('profile.title')
    }
  },
  data: () => ({
    name: '',
    locale: '',
    isValid: false,
    langs: [
      {
        name: "English",
        val: "en-US"
      },
      {
        name: "Русский",
        val: "ru-RU"
      }
    ],
    nameRules: [
      v => !!v || localizeFilter('shared.errors.enterName'),
      v => (v && v.length >= 2) || localizeFilter('shared.errors.minLength') + ': ' + 2
    ]
  }),
  mounted() {
    this.name = this.info.name
    this.locale = this.info.locale
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if(!this.isValid) {
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.locale
        })
      } catch (e) {}
    }
  }
}
</script>

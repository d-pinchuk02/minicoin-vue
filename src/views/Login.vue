<template>
  <v-card class="elevation-3">
    <v-toolbar flat>
      <v-toolbar-title>{{ this.$title('login.title') }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="isValid" @submit.prevent="submitHandler">
        <v-text-field
          :label="'shared.email' | localize"
          :rules="emailRules"
          name="email"
          prepend-icon="mdi-at"
          type="email"
          v-model.trim="email"
          required
        ></v-text-field>

        <v-text-field
          :label="'shared.password' | localize"
          :rules="passwordRules"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model.trim="password"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        to="register"
        text
      >{{'shared.signup' | localize}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click.prevent="submitHandler"
        color="primary"
        :disabled="!isValid"
      >{{'shared.signin' | localize}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'login',
  metaInfo() {
    return {
      title: this.$title('login.title')
    }
  },
  data: () => ({
    email: '',
    password: '',
    isValid: true,
    emailRules: [ 
        v => !!v || localizeFilter('shared.errors.enterEmail'), 
        v => /^\S+@\S+\.\S+$/.test(v) || localizeFilter('shared.errors.enterCorrectEmail') 
    ],
    passwordRules: [ 
      v => !!v || localizeFilter('shared.errors.enterPassword'), 
      v => (v && v.length >= 8) || localizeFilter('shared.errors.minLength') + ': ' + 8
    ]
  }),
  mounted() {
    if (this.$route.query.locale) {
        let info = {locale: this.$route.query.locale}
        this.$store.commit('setInfo', info)
    }

    if(this.$route.query.message) {
      this.$message(localizeFilter('msg.' + this.$route.query.message))
    }
  },
  methods: {
    async submitHandler() {
      if(!this.isValid) {
        console.log('invalid')
        return
      }
      
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        await this.$store.dispatch('fetchInfo')
        this.$router.push('/')
      } catch (e) {}

    }
  }
}
</script>

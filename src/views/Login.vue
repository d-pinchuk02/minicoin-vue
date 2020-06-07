<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ this.$title('login.title') }}</span>
      <div class="input-field">
        <input 
          id="email" 
          type="email" 
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">{{'shared.email' | localize}}</label>
        <small 
          class="helper-text invalid" 
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{'shared.errors.enterEmail' | localize}}
        </small>
        <small 
          class="helper-text invalid" 
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{'shared.errors.enterCorrectEmail' | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password" 
          type="password" 
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">{{'shared.password' | localize}}</label>
        <small 
          class="helper-text invalid" 
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{'shared.errors.enterPassword' | localize}}
        </small>
        <small 
          class="helper-text invalid" 
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{'shared.errors.minLength' | localize}}: {{$v.password.$params.minLength.min}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'shared.signin' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'login.noAccount' | localize}}
        <router-link to="/register">{{'shared.signup' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
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
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)}
  },
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
      if(this.$v.$invalid) {
        this.$v.$touch()
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

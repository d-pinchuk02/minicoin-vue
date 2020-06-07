<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ this.$title('register.title') }}</span>
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
          {{'shared.errors.minLength' | localize}} {{$v.password.$params.minLength.min}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength)}"
        />
        <label for="name">{{'shared.name' | localize}}</label>
        <small 
          class="helper-text invalid" 
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{'shared.errors.enterName' | localize}}
        </small>
        <small 
          class="helper-text invalid" 
          v-else-if="$v.name.$dirty && !$v.name.minLength"
        >
          {{'shared.errors.minLength' | localize}} {{$v.name.$params.minLength.min}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{'register.agree' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'shared.signup' | localize}}
          <v-icon dark right>mdi-send</v-icon>
        </button>
      </div>

      <p class="center">
        {{'register.hasAccount' | localize}}
        <router-link to="/login">{{'shared.signin' | localize}}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('register.title')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
    name: {required, minLength: minLength(2)},
    agree: {checked: v => v}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

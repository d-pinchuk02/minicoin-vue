import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey:            process.env.VUE_APP_FIRE_API_KEY,
  authDomain:        process.env.VUE_APP_FIRE_AUTH_DOMAIN,
  databaseURL:       process.env.VUE_APP_FIRE_DATABASE_URL,
  projectId:         process.env.VUE_APP_FIRE_PROJECT_ID,
  storageBucket:     process.env.VUE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID,
  appId:             process.env.VUE_APP_FIRE_APP_ID,
  measurementId:     process.env.VUE_APP_FIRE_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

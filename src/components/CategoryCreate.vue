<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'categorycreate.title'| localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name" 
            type="text" 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'categorycreate.name'| localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            {{'categorycreate.error.enterTitle'| localize}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">{{'shared.limit'| localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{'categorycreate.error.minValue'| localize}}: {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'shared.create'| localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    limit: 1
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })

        this.title = ''
        this.limit = 1
        this.$v.$reset()
        // TODO: translate message
        this.$message('Категория была создана')

        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>

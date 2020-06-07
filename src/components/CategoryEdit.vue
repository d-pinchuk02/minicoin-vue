<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'categoryedit.title'| localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{ c.title }}</option>
          </select>
          <label>{{'shared.selectCategory'| localize}}</label>
        </div>

        <div class="input-field">
          <input
            id="name" 
            type="text" 
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">{{'categoryedit.name'| localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            {{'categoryedit.error.enterTitle'| localize}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
            min="1"
          />
          <label for="limit">{{'shared.limit'| localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{'categoryedit.error.minValue'| localize}}: {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'shared.update'| localize}}
          <v-icon dark right>mdi-send</v-icon>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(1)}
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id,
    this.title = title
    this.limit = limit
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message(localizeFilter('msg.categoryUpdated'))
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

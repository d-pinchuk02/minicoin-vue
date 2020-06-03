<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'detailrecord.history' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income'
              ? localizeFilter('shared.income')
              : localizeFilter('shared.outcome')
          }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.type === 'income' ? 'green' : 'red'">
            <div class="card-content white-text">
              <p>{{'shared.description' | localize}}: {{record.description}}</p>
              <p>{{'shared.amount' | localize}}: {{record.amount | currency}}</p>
              <p>{{'shared.category' | localize}}: {{record.categoryName}}</p>

              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{'detailrecord.noRecord' | localize}}</p>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'detail',
  data: () => ({
    record: null, 
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  },
  methods: {
    localizeFilter(key) {
      return localizeFilter(key)
    }
  }
}
</script>

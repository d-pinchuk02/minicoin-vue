<template>
  <div>
    <h1>
      {{'planning.title' | localize}}
      ({{info.bill | currency('UAH')}})
    </h1>

    <v-divider class="mb-4"></v-divider>

    <Loader v-if="loading" />
    <v-alert v-else-if="!categories.length" type="info">
      {{'shared.noCategories' | localize}} <router-link class="white--text" to="/categories">{{'shared.addCategory' | localize}}</router-link>
    </v-alert>
    <v-col v-else cols="12" v-for="cat of categories" :key="cat">
      <p>
        <strong>{{cat.title}}:</strong>
        {{cat.spent | currency}} {{'shared.of' | localize}} {{cat.limit | currency}}
      </p>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            rounded="true"
            height="8"
            v-bind="attrs"
            v-on="on"
            :color="cat.progressColor"
            :value="cat.progressPercent"
          ></v-progress-linear>
        </template>
        <span>{{cat.tooltip}}</span>
      </v-tooltip>
    </v-col>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('planning.title')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spent = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

      const percent = 100 * spent / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spent
      const tooltip = `${tooltipValue < 0
        ? localizeFilter('planning.excess')
        : localizeFilter('planning.left')
      } ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip
      }
    })

    this.loading = false

  }
}
</script>

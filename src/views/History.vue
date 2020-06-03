<template>
  <div>
    <div class="page-title">
      <h3>{{'history.title' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>
    <p v-else-if="!records.length" class="center">{{'history.noRecords' | localize}} <router-link to="/record">{{'history.addRecord' | localize}}</router-link></p>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate 
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'&lt;'"
        :nextText="'&gt;'"
        :containerClass="'pagination'"
        :pageClass="'waves-effect'"
        :marginPages="2"
      />
    </section>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import {Doughnut} from 'vue-chartjs' 

export default {
  name: 'history',
  extends: Doughnut,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? localizeFilter('shared.income') : localizeFilter('shared.outcome')
        }
      }))

      this.renderChart({ // data
        labels: categories.map(c => c.title),
        datasets: [{
            label: localizeFilter('history.chartTitle'),
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }

                return total
              }, 0)
            }),
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(64, 255, 159, 1)',
                'rgba(64, 67, 255, 1)',
                'rgba(252, 64, 255, 1)',
                'rgba(128, 128, 128, 1)',
                'rgba(229, 62, 26, 1)',
                'rgba(62, 62, 26, 1)'
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)',
                'rgba(255, 159, 64, 0.9)',
                'rgba(64, 255, 159, 0.9)',
                'rgba(64, 67, 255, 0.9)',
                'rgba(252, 64, 255, 0.9)',
                'rgba(128, 128, 128, 0.9)',
                'rgba(229, 62, 26, 0.9)',
                'rgba(62, 62, 26, 0.9)'
            ],
            borderWidth: 2
        }]
      }, { /* options */ })
    }
  },
  components: {
    HistoryTable
  }
}
</script>

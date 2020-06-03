<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'homecurrency.title' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'homecurrency.currency' | localize}}</th>
              <th>{{'homecurrency.rate' | localize}}</th>
              <th>{{'shared.date' | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur of currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(2)}}</td>
              <!-- Convert date from unixtime to JS unixtime -->
              <td>{{ date * 1000 | date('date') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  })
}
</script>

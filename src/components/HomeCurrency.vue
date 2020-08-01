<template>
  <v-card color="deep-orange" dark>
    <v-card-title>{{'homecurrency.title' | localize}}</v-card-title>
    <v-card-text>
      <v-simple-table dark class="deep-orange">
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
              <td>{{ date * 1000 | date('date') }}</td>
            </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.prevent="$parent.refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  })
}
</script>

<style scoped>
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: inherit;
}
</style>

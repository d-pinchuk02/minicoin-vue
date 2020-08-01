<template>
  <v-data-table
    hide-default-footer
    item-key="id"
    :headers="headers"
    :items="items"
    :items-per-page="15"
    :page.sync="page"
    @page-count="$parent.pageCountChanged($event)"
  >
    <template v-slot:item.amount="{ item }">
      {{ item.amount | currency }}
    </template>

    <template v-slot:item.date="{ item }">
      {{ item.date | date('datetime') }}
    </template>

    <template v-slot:item.type="{ item }">
      <v-chip :color="item.typeClass" text-color="white">
        {{ item.typeText }}
      </v-chip>
    </template>

    <template v-slot:item.open="{ item }">
      <v-btn
        color="primary"
        :to="`/detail/${item.id}/page/${page}`"
      >
        <v-icon>
          mdi-open-in-new
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    page:
    {
      required: true,
      type: Number
    },
    records: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      { text: localizeFilter('shared.amount'), value: 'amount' },
      { text: localizeFilter('shared.date'), value: 'date' },
      { text: localizeFilter('shared.category'), value: 'categoryName' },
      { text: localizeFilter('shared.type'), value: 'type' },
      { text: localizeFilter('historytable.open'), value: 'open' },
    ],
    pageCount: 1
  }),
  computed: {
    items() {
      return this.records.map(
        (items, index) => ({
          ...items,
          index: index + 1
        }))
    }
  },
  methods: {
    localizeFilter(key) {
      return localizeFilter(key)
    }
  }
}
</script>

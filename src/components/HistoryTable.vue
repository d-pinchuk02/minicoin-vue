<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'shared.amount' | localize}}</th>
        <th>{{'shared.date' | localize}}</th>
        <th>{{'shared.category' | localize}}</th>
        <th>{{'shared.type' | localize}}</th>
        <th>{{'historytable.open' | localize}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currency}}</td>
        <td>{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{record.typeText}}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            v-tooltip="localizeFilter('historytable.openRecord')"
            @click="$router.push(`/detail/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  methods: {
    localizeFilter(key) {
      return localizeFilter(key)
    }
  }
}
</script>

<template>
  <v-overlay>
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <p class="mt-2">{{'shared.loading' | localize}}</p>
  </v-overlay>
</template>

<script>
export default {
}
</script>

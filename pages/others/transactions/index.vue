<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `Transactions | Nuxt App`,
})

</script>

<template>
  <div>
    Transactions
  </div>
</template>
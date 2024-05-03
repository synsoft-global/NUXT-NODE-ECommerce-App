<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `Reports | Nuxt App`,
})
</script>

<template>
  <div class="pp-main-content dashboard-page reports-page">
    <div class="pp-page-title">
      <div class="flex flex-row justify-between items-center">
        <h2 class="h-2 m-0">
          Reports
        </h2>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `Team Members | Nuxt App`,
})

</script>

<template>
  <div>
    {{ $t("menu.teamMembers") }}
  </div>
</template>
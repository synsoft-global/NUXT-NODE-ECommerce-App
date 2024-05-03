<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `${t("menu.teamMembers")} | Nuxt App`,
})

</script>

<template>
  <div>
    {{ $t("menu.teamMembers") }}
  </div>
</template>
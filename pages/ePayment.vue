<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
<template>
  <div>
    e payment page
    <!-- <span :key="index" v-for="(elem, index) of scripts">
      <span>
        <VueScriptComponent :script="elem" />
      </span>
    </span> -->
  </div>
</template>

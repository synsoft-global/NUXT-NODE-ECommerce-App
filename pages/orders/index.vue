<script setup lang="ts">
import OrderListing from '~/components/order/orderListing.vue';

definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `Orders | Nuxt App`,
})
</script>

<template>
  <no-ssr>
    <UContainer class="py-7 px-5">
      <div class="flex gap-5 justify-between xl:flex-row flex-col mb-2">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {{ $t('menu.Orders') }}
        </h2>
        <div class="flex gap-5 flex-wrap">
          <div>
            <NuxtLink to="orders/new">
              <UButton
                icon="i-heroicons-plus-circle-solid"
                :label="$t('common.createOrder')"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
      <OrderListing />
      <UNotifications />
    </UContainer>
  </no-ssr>
</template>
<script setup lang="ts">
useHead({
  title: `Nuxt App`,
})
import AppHeader from '~/components/common/AppHeader.vue';
import AppSidebar from '~/components/common/AppSidebar.vue';
import AppFooter from '~/components/common/AppFooter.vue';

// Initialize sidebar state
const sidebarExpanded = ref(true);

// Function to toggle the sidebar state
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

</script>

<template>
  <no-ssr>
    <div>
      <!-- Begin page -->
      <AppHeader
        :toggle-sidebar="toggleSidebar"
        :sidebar-expanded="sidebarExpanded"
      />

      <!-- Sidebar -->
      <div :class="`max-h-[calc(100vh-130px)] overflow-y-scroll z-20 overflow-x-visible fixed ${sidebarExpanded ? 'w-[300px]' : 'w-[70px]'} top-16 bg-transparent`">
        <AppSidebar :sidebar-expanded="sidebarExpanded" />
      </div>

      <div :class="`relative ${sidebarExpanded ? 'ml-[300px]' : 'ml-[70px]'} pt-[70px] min-h-screen`">
        <slot />
      </div>

      <!-- END layout-wrapper -->
      <AppFooter />
      <UNotifications />
    </div>
  </no-ssr>
</template>
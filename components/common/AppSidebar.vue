<script setup lang="ts">
import { ref } from 'vue';
import { menuItems } from '~/constants/menu';
const props = defineProps(['sidebarExpanded']);
import SidebarItem from '~/components/common/SidebarItem.vue';

const menus = ref(menuItems);
const updateMenu = (data: any) => {
  menus.value.map((item: any) => {
    if (item.id === data.id && Object.prototype.hasOwnProperty.call(item, 'isMenuCollapsed')) {
      item.isMenuCollapsed = !item.isMenuCollapsed;
    }
    else if (item.isMenuCollapsed){
      item.isMenuCollapsed = false;
    }
  });
};

</script>
<template>
  <div class="sidebar-menu">
    <!-- Render menu items -->
    <ul
      id="side-menu"
      class="list-unstyled menuitem-active"
    >
      <SidebarItem
        v-for="(item,i) in menus"
        :key="i"
        :item="item"
        :update-menu="updateMenu"
        :sidebar-expanded="props.sidebarExpanded"
      />
    </ul>
  </div>
</template>

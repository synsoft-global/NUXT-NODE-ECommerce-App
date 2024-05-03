<script setup lang="ts">
const props = defineProps(["item", "updateMenu", "sidebarExpanded"]);
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
const { item, updateMenu } = props;
const colorMode = useColorMode();
const isActiveSubmenu = () => {
    return item.path && item.path === route.path.split('/')[1]
}
</script>

<template>
  <li
    v-if="item.subItems && item.subItems.length !== 0"
    :id="item.id"
  >
    <template v-if="props.sidebarExpanded">
      <ULink
        :class="`rounded-md flex px-[6px] py-[10px] relative font-[5000] text-[15px] w-full items-center ${isActiveSubmenu()
          ? 'text-primary bg-white dark:bg-gray-500 dark:text-white'
          : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200'
        }`"
        @click="updateMenu(item)"
      >
        <span :class="`mr-[12px] ${isActiveSubmenu() && 'bg-primary'} rounded-md p-3`">
          <img
            v-if="item.src"
            :src="colorMode.value === 'dark' || isActiveSubmenu()
              ? item.srcActive
              : item.src
            "
            alt="Avatar"
            :class="'w-5'"
          >
        </span>
        <span>{{ $t(item.label) }}</span>
        <UIcon
          :name="`${item.isMenuCollapsed ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'}`"
          class="ml-auto mr-2"
        />
        <span
          v-if="isActiveSubmenu()"
          class="w-[3px] bg-primary dark:bg-[#93A6FF] rounded-sm h-7 absolute right-[2px]"
        />
      </ULink>
      <ul class="mt-2">
        <li
          v-for="subItem in item.subItems"
          :key="subItem.id"
          class="pl-10"
        >
          <div v-if="item.isMenuCollapsed">
            <ULink
              :to="subItem.to"
              active-class="text-primary bg-white dark:bg-gray-500 dark:text-white"
              inactive-class="text-gray-400 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200"
              class="rounded-md flex px-[6px] py-[10px] relative font-[5000] text-[15px] w-full items-center"
            >
              <span>{{ $t(subItem.label) }}</span>
            </ULink>
            <div
              id="sidebarTasks"
              class="collapse"
            />
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <UPopover
        :popper="{ arrow: true, placement: 'right' }"
        class="overflow-visible"
      >
        <ULink
          :class="`rounded-md flex px-[6px] py-[10px] relative font-[5000] text-[15px] w-full items-center ${isActiveSubmenu()
            ? 'text-primary'
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200'
          }`"
          @click="updateMenu(item)"
        >
          <span :class="`m-auto ${isActiveSubmenu() && 'bg-primary'} rounded-md p-3`">
            <img
              v-if="item.src"
              :src="colorMode.value === 'dark' || isActiveSubmenu()
                ? item.srcActive
                : item.src
              "
              alt="Avatar"
              :class="'w-5'"
            >
          </span>
        </ULink>
        <template #panel>
          <div class="p-4 text-sm text-white bg-gray-700">
            <ul class="mt-2 text-center">
              <li class="p-4 text-sm text-white bg-gray-700 border-b border-[#BFCEE0]">
                {{ $t(item.label) }}
              </li>
              <li
                v-for="subItem in item.subItems"
                :key="subItem.id"
                class="p-4 text-sm text-[#BFCEE0] bg-gray-700"
              >
                <ULink :to="subItem.to">
                  {{ $t(subItem.label) }}
                </ULink>
              </li>
            </ul>
          </div>
        </template>
      </UPopover>
    </template>
  </li>
  <li
    v-else
    :id="item.id"
  >
    <ULink
      v-if="props.sidebarExpanded"
      v-slot="{ isActive }"
      :to="item.to"
      active-class="text-primary bg-white dark:bg-gray-500 dark:text-white"
      inactive-class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200"
      class="rounded-md flex px-[6px] py-[10px] relative font-[5000] text-[15px] w-full items-center"
      @click="updateMenu(item)"
    >
      <span
        v-if="item.src"
        :class="`mr-[12px] ${isActive && 'bg-primary'} rounded-md p-3`"
      >
        <img
          :src="colorMode.value === 'dark' || isActive ? item.srcActive : item.src
          "
          alt="Avatar"
          :class="'w-5'"
        >
      </span>
      <span>{{ $t(item.label) }}</span>
      <span
        v-if="isActive"
        class="w-[3px] bg-primary dark:bg-[#93A6FF] rounded-sm h-7 absolute right-[2px]"
      />
    </ULink>
    <UPopover
      v-else
      mode="hover"
      :popper="{ arrow: true, placement: 'right' }"
    >
      <ULink
        v-slot="{ isActive }"
        :to="item.to"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-gray-200"
        class="rounded-md flex px-[6px] py-[10px] relative font-[5000] text-[15px] w-full items-center"
        @click="updateMenu(item)"
      >
        <span
          v-if="item.src"
          :class="`m-auto ${isActive && 'bg-primary'} rounded-md p-3`"
        >
          <img
            :src="colorMode.value === 'dark' || isActive ? item.srcActive : item.src
            "
            alt="Avatar"
            :class="'w-5'"
          >
        </span>
      </ULink>
      <template #panel>
        <div class="p-4 text-sm text-white bg-gray-700">
          <span>{{ $t(item.label) }}</span>
        </div>
      </template>
    </UPopover>
  </li>
</template>

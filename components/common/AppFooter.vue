<template>
  <footer class="rounded-lg p-4">
    <div class="w-full mx-auto px-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center">© {{ new Date().getFullYear() }} <NuxtLink
        to="/"
        class="hover:underline"
      >Flowbite™</NuxtLink>. All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li>
          <NuxtLink
            to="/"
            class="hover:underline me-4 md:me-6"
          >
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/"
            class="hover:underline me-4 md:me-6"
          >
            Privacy Policy
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/"
            class="hover:underline me-4 md:me-6"
          >
            Licensing
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/"
            class="hover:underline"
          >
            Contact
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
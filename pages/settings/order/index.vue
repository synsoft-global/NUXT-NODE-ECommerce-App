<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: `Order Creation | Nuxt App`,
})
</script>

<template>
  <div>
    <div class="pp-main-content">
      <div class="pp-page-title notif-page-title mb-3">
        <div class="flex justify-between items-center">
          <h2 class="h-2 m-0">
            Order Creation
          </h2>
          <!-- <div class="flex justify-end">
            <a
              href="https://help.mengantar.com/id/collections/2876490-settings"
              target="_blank"
              class="pp-btn-tutorial"
              >Tutorial</a
            >
          </div> -->
        </div>
      </div>
    </div>
    <!-- Template list -->
    <div class="">
      <div class="card">
        <div class="d-flex align-items justify-content-between title-settings-order flex-column flex-sm-row">
          <div class="flex items-center">
            <img
              class="mr-2"
              src="~/assets/img/icon/Download.svg"
            >
            <h5 class="">
              CSV Templates
              <!--{{ $t("settings.csvTemplates") }}-->
            </h5>
          </div>
          <div class="right-button d-flex gap-button align-items-center flex-wrap">
            <a
              href="/template/Daftar_Kodepos.xlsx"
              download
            >
              <button class="text-capitalize pp-btn-border-blue d-flex justify-content-center">
                <img
                  class="light"
                  src="~/assets/img/icon/Download.svg"
                  alt="app"
                >
                <img
                  class="dark"
                  src="~/assets/img/icon/Download.svg"
                  alt="app"
                >
                download zip bulk
              </button>
            </a>
            <button class="settings-order pp-btn-blue">
              <img
                src="~/assets/img/icon/Download.svg"
                alt="app"
              >
              {{ $t("settings.createTempate") }}
            </button>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(["options", "value", "full", "className", "markVariant"]);

  const  emit  = defineEmits();

const onSwitch = (val:string) => {
  emit('update:value', val);
};

  const truncatedText = (text:string, getText = true) => {
      const maxLength = 100;
      if (text.length > maxLength) {
        return getText ? text.slice(0, maxLength) + "..."  : true;
      } else {
        return getText ? text.slice(0, maxLength) + "..."  : false;
      }
    }

</script>

<template>
  <div
    class="flex button-green-flag shipping_buttons gap-4"
    :class="className"
  >
    <template
      v-for="(option, i) in options"
      :key="i"
    >
      <div
        class="w-full border py-4 px-5 rounded-md cursor-pointer text-xs border-custom-200 hover:border-primary hover:bg-custom-50 text-center"
        :class="{
          'border-primary bg-custom-50': value == option.id,
          'bg-white border-gray-300 fake-input': value != option.id,
          'with-image': option.imgSrc,
          'disabled-option':option.disabled  
        }"
        @click="onSwitch(option.id)"
      >
        <div class="d-flex align-items-center">
          <span v-if="option.imgSrc">
            <img
              :src="option.imgSrc"
              class="courier-img icon"
              width="34px"
              height="34px"
              style="margin-right: 8px; border-radius: 8px; object-fit: contain;"
            >
          </span>
          <span
            :class="
              option.id != 'JNE' && option.id != 'Sicepat' && option.id != 'Sap'
                ? 'option-text'
                : ''
            "
            class="btn-text fs-13 fw-500"
          >{{ option.text }}</span>
        </div>
        <template v-if="value == option.id">
          <img
            v-if="markVariant === 'green'"
            id="voicebutton"
            class="active-mark active-mark--green"
            src="~/assets/img/icon/Green-tick.svg"
          >
          <img
            v-else
            id="voicebutton"
            class="active-mark "
            src="~/assets/img/icon/blue-tick.svg"
          >
        </template>
      </div>
    </template>
  </div>
</template>



<style>
.variant-selected-btn {
  .disabled-option{
    background-color:#F6F8FC;
    color:#B1BBC9;
    opacity: 1;
  }
  .email_verify_btn {
    max-width: 100% !important;
    padding: 12px 15px;
    min-width: 80px;
    min-height: 44px;
    width: 100%;
    height: auto;
    position: relative;
    overflow-wrap: anywhere;    
    &.fake-input{
      border: 1px solid transparent !important;
      &:before{
        content: "";
          position: absolute;
          inset: 0px;
          border: 1px solid #BFCEE0;
          border-radius: 8px;
      }
    }
    &.active, &:hover{
      border: 1px solid #2e47ba;
      background-color: #f5f6fc;
    }
  }
}
.email_verify_btn {
  &.active, &:hover{
    border: 1px solid #2e47ba !important;
    background-color: #f5f6fc;
    transition: .3s ease;
  }
}

.tuktukTheme .active-mark{
  display: none;
}

.tuktukTheme .email_verify_btn {
  position: relative;
  min-width: unset;
  height: auto;
  min-width: 60px;
  min-height: 40px;
  padding: 4px 8px;
  border: 1px solid transparent !important;
  border-radius: 4px;

  &:before{
    content: "";
    position: absolute;
    inset: 0px;
    border: 1px solid rgba(21, 23, 28, 0.10);
    border-radius: 4px !important;
  }
  &.active, 
  &:hover{
    box-shadow: none;
    border: 1px solid transparent !important;
    &:before{
      border: 2px solid #EB435B;
    }
    span{
      color: #EB435B;
    }
  }
  span{
    color: #15171C;
    text-align: center;
    /* font-family: TikTokDisplayRegular; */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 19.2px */
    letter-spacing: 0.24px;
    overflow-wrap: normal;
  }
  
  .disabled-option{
    background-color:transparent;
    color: #15171C !important;
    opacity: 0.4;
    .b-simple__content__title{
      color: #15171C !important; 
    }
  }
  
}
</style>
<style scoped>
.gap14px {
  grid-gap: 14px;
}
.btn-switch.active {
  background-color: #2e47ba;
}
html:not(.bg-dark) .btn-switch.active {
  color: white;
}

.btn-switch {
  border-top: 1px solid #2e47ba;
  border-bottom: 1px solid #2e47ba;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-left: 1px solid #2e47ba;
  border-right: 1px solid #2e47ba;
  cursor: pointer;
  color: #2e47ba;
}

.btn-left {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.btn-right {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.button-green-flag > div {
  position: relative;
}
.button-green-flag .active-mark {
  position: absolute;
  top: -9px;
  right: -8px;
}
.button-green-flag .active-mark--green {
  position: absolute;
  top: -10px;
  right: 21px;
}
.button-green-flag .active-mark--gree img {
  width: 18px;
}

.gap-courier {
  grid-gap: 10px;
}
.gap-courier .btn-text {
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.02em;
}
</style>

<style>
.variant-selected-btn .email_verify_btn .option-text,
.variant-selected-btn .email_verify_btn {
  width: 100%;
}

.email_verify_btn--full-width{
  width: 100%;
  min-width: 100%;
}

.variant-selected-btn .email_verify_btn .option-text {
  white-space: normal;
  text-align: left !important;
  font-weight: 400;
}

.hover-variant {
  position: absolute;
  bottom: 50px;
  background-color: #203551;
  padding: 5px 10px;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  border-radius: 10px;
  z-index: -1;
  opacity: 0;
  transition: 0.3s ease;
  max-width: 100%;
  height: auto;
  white-space: normal;
}

.variant-selected-btn .email_verify_btn:hover .hover-variant {
  display: block;
  bottom: 60px;
  opacity: 1;
  z-index: 99;
}

</style>

<script setup lang="ts">
const props = defineProps({
    files: {
        // type: any,
        default: []
    },
    maxAllowedFiles: {
        type: Number,
        default: 10
    }
})
const isDragging = ref(false)
const localFiles = ref<any>([])
const emit  = defineEmits();

const onChange = (e: any) => {
    const items = e.target.files;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (localFiles.value.length < props.maxAllowedFiles && !isFileAlreadyAdded(item)) {
            localFiles.value.push(item);
        }
    }
    emit('update:files',localFiles.value);
}

const removeImages = (index: number) => {
    localFiles.value.splice(index, 1);
    emit('update:files',localFiles.value);
}

const dragover = (e: any) => {
    e.preventDefault();
    isDragging.value = true;
}

const dragleave = (e: any) => {
    isDragging.value = false;
}

const generateURL = (file: any) => {
    const fileSrc = URL.createObjectURL(file);
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
}

const drop = (e: any) => {
    e.preventDefault();
    isDragging.value = false;
    const items = e.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' && localFiles.value.length < props.maxAllowedFiles) {
            const file: any = item.getAsFile();
            if(!isFileAlreadyAdded(file))  localFiles.value.push(file);
        }
    }
    emit('update:files',localFiles.value);
}

const isFileAlreadyAdded = (file: File) => {
    return localFiles.value.some((existingFile: File) => existingFile.name === file.name && file.size === existingFile.size);
};

</script>

<template>
  <div class="main">
    <div
      :class="`dropzone-container bg-blue-50 ${isDragging ? 'border-green-400' : 'border-gray-300'}`"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        id="fileInput"
        ref="file"
        type="file"
        :multiple="props.maxAllowedFiles > 1 ? true : false"
        name="file"
        class="hidden-input"
        accept=".pdf,.jpg,.jpeg,.png"
        @change="onChange"
      >
      <label
        v-if="localFiles?.length === 0"
        for="fileInput"
        class="file-label m-auto"
      >
        <div v-if="isDragging">Release to drop.</div>
        <div v-else>
          <UIcon name="i-heroicons-paper-clip" />Upload Images
        </div>
      </label>
      <div
        v-else
        class="contents"
      >
        <div
          v-for="(img, index) in localFiles"
          :key="index"
          class="border-gray-300 w-[118px] max-w-full image-container"
        >
          <div class="relative pb-[100%] overflow-hidden w-full h-full">
            <div
              :style="`background-image: url(${generateURL(img)})`"
              class="preview-img"
            />
            <img
              class="close-btn"
              src="~/assets/img/icon/close.svg"
              alt="cross icon"
              @click="() => removeImages(index)"
            >
          </div>
        </div>
        <div
          v-if="localFiles?.length < props.maxAllowedFiles"
          class="border-gray-300 flex justify-center items-center image-container max-w-full"
        >
          <label
            for="fileInput"
            class="file-label"
          >
            <UIcon name="i-heroicons-paper-clip" />
            <div class="text-sm">Upload Images</div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.dropzone-container {
    padding: 1.25rem .5rem;
    width: 100%;
    gap: 0.5rem;
    flex-wrap: wrap;
    border-radius: 8px;
    min-height: 118px;
    border-style: dashed;
    border-width: 1px;
    height: auto;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
}

.image-container {
    overflow: hidden;
    width: 118px;
    height: 118px;
    border-radius: 8px;
    border-style: dashed;
    border-width: 1px;
}

.close-btn {
    color: rgba(189, 186, 186, 0.7);
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 8px;
    border-radius: 100%;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}

.preview-img {
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0px;
    left: 0;
    background-size: cover;
    background-position: 50%;
}
</style>
<script setup>
import { store } from "../store.js";
import { ref, onMounted } from "vue";

const file = ref(null);
const canvas = ref(null);
const ctx = ref(null);

function handleFileUpload(event) {
  store.mutateIsImageUploaded(true);

  const image = new Image();
  image.onload = () => {
    ctx.value = canvas.value.getContext("2d");
    canvas.value.width = image.width;
    canvas.value.height = image.height;
    ctx.value.drawImage(image, 0, 0);
  };
  const imageURL = URL.createObjectURL(file.value.files[0]);
  store.mutateFileName(file.value.files[0].name);
  store.mutateImage(imageURL);
  image.src = store.image.src;
}

function removeFile() {
  store.mutateIsImageUploaded(false);
  store.mutateImage(null);
  console.log(store.image.src);
}

onMounted(() => {
  if (store.image.src) {
    const image = new Image();

    image.onload = () => {
      ctx.value = canvas.value.getContext("2d");
      canvas.value.width = image.width;
      canvas.value.height = image.height;
      ctx.value.drawImage(image, 0, 0);
    };
    image.src = store.image.src;
  }
});
</script>

<template>
  <div class="flex flex-col items-center w-full gap-2">
    <transition name="fade">
      <div
        v-if="store.isImageUploaded"
        class="flex flex-col items-center w-full gap-2"
      >
        <div class="w-full max-w-xl card">
          <div class="flex card-body bg-base-100">
            <div class="flex flex-row text-xl"></div>
            <div class="grid items-center grid-cols-2 gap-2">
              <span class="flex justify-center font-mono">
                {{ store.fileName }}
              </span>

              <span class="flex justify-center">
                {{ store.imageWidth }} x {{ store.imageHeight }}
              </span>

              <div class="btn btn-secondary" @click="removeFile">
                Remove Image
              </div>
              <router-link class="btn btn-primary" :to="{ name: 'colors' }">
                Next Step
              </router-link>
            </div>
          </div>
        </div>
        <div class="card bg-base-100">
          <div class="card-body">
            <div class="card bg-base-100">
              <canvas class="w-full" ref="canvas" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="absolute w-full max-w-xl card">
        <div class="flex flex-col card-body bg-base-100">
          <div class="text-xl">
            Supported filetypes
            <span class="font-mono">.jpg, .png</span>
          </div>
          <label class="btn btn-primary btn-block">
            <span> <i class="mr-2 fas fa-file-upload" /> Upload File </span>
            <input
              type="file"
              ref="file"
              class="hidden"
              @change="handleFileUpload"
            />
          </label>
        </div>
      </div>
    </transition>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

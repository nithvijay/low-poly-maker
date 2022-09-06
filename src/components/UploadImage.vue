<script setup>
import { store } from "../store.js";
import { ref, onMounted } from "vue";

const file = ref(null);
const canvas = ref(null);
const ctx = ref(null);

function handleFileUpload(event) {
  const image = new Image();
  image.onload = () => {
    canvas.value.width = image.width;
    canvas.value.height = image.height;
    ctx.value.drawImage(image, 0, 0);
  };
  const imageURL = URL.createObjectURL(file.value.files[0]);
  image.src = imageURL;
  store.mutateImage(imageURL);
}

onMounted(() => {
  ctx.value = canvas.value.getContext("2d");
});
</script>

<template>
  <div class="bg-slate-700">
    <label class="btn btn-primary">
      <span v-if="!store.image.src">
        <i class="mr-2 fas fa-file-upload" /> Upload File
      </span>
      <span v-else class="py-2"> test </span>
      <input type="file" ref="file" class="hidden" @change="handleFileUpload" />
    </label>
    <canvas class="w-1/2" ref="canvas" />
  </div>
</template>

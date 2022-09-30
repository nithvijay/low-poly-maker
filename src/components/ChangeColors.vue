<script setup>
import { onMounted, ref } from "vue";
import { store } from "../store.js";
import { applyFilter } from "../utils/changeColorUtils.js";

const canvas = ref(null);
const ctx = ref(null);

onMounted(() => {
  const image = new Image();

  image.onload = () => {
    ctx.value = canvas.value.getContext("2d");
    canvas.value.width = image.width;
    canvas.value.height = image.height;
    ctx.value.drawImage(image, 0, 0);
  };
  image.src = store.image.src;
});

function applyFilterToCanvas(filterName) {
  applyFilter(canvas, ctx, filterName);
}
</script>

<template>
  <div class="w-full max-w-7xl card">
    <div class="flex flex-col card-body bg-base-100">
      <div class="grid grid-cols-6">
        <div class="col-span-6 md:col-span-2">
          <div class="flex flex-wrap gap-2 overflow-y-auto">
            <btn class="btn btn-primary" @click="applyFilterToCanvas('sepia')"
              >Sepia</btn
            >
            <div class="btn btn-primary">Click</div>
            <div class="btn btn-primary">Click</div>
            <div class="btn btn-primary">Click</div>
            <div class="btn btn-primary">Click</div>
            <div class="btn btn-primary">Click</div>
            <div class="btn btn-primary">Click</div>
            <div class="btn btn-primary">Click</div>
          </div>
        </div>
        <div class="col-span-6 md:col-span-4">
          <canvas class="w-full" ref="canvas" />
        </div>
      </div>
    </div>
  </div>
</template>

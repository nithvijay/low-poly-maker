<!-- contains all the components -->

<script setup>
import { onMounted, ref } from "vue";
import { filterImage, prewittHorizontal } from "lena.js";
import { getLowPoly, downloadCanvas } from "../utils.js";
import { useRouter, useRoute } from "vue-router";

const canvas = ref(null);
const canvasOrig = ref(null);
const ctx = ref(null);
const ctxOrig = ref(null);
const image = ref(null);

const threshold = ref(100);
const acceptedN = ref(10000);

onMounted(() => {
  // ctx.value = canvas.value.getContext("2d");
  // ctxOrig.value = canvasOrig.value.getContext("2d");
});

function changeRed(value) {
  var pixels = ctx.value.getImageData(
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );

  let args = [pixels, 0];
  let newPixels = prewittHorizontal.apply(null, args);
  let d = newPixels.data;

  for (let i = 0; i < d.length; i += 4) {
    d[i] = 255 - d[i];
    // d[i + 1] = 0
    // d[i + 2] = 0
  }

  ctx.value.putImageData(newPixels, 0, 0);

  filterImage(canvas.value, prewittHorizontal, image.value);
}

function func() {
  ctx.value = canvas.value.getContext("2d");
  image.value = new Image();
  image.value.onload = () => {
    canvas.value.width = image.value.width;
    canvas.value.height = image.value.height;
    ctx.value.drawImage(image.value, 0, 0);
    getLowPoly(canvas, ctx, threshold.value, acceptedN.value);
  };
  image.value.src = URL.createObjectURL(file.value.files[0]);
}

const file = ref(null);
function handleFileUpload(event) {
  image.value.src = URL.createObjectURL(file.value.files[0]);
}
const route = useRoute();
console.log(route.name);
</script>

<template>
  <!-- Largest -->
  <div class="flex flex-col items-center gap-2 p-2">
    <!-- Steps navigation -->
    <div class="w-full max-w-4xl card">
      <div class="flex card-body bg-base-100">
        <ul class="steps steps-vertical md:steps-horizontal">
          <router-link
            class="step"
            :class="
              (route.name == 'upload' ||
                // route.name == 'colors' ||
                route.name == 'poly' ||
                route.name == 'generate') &&
              'step-primary'
            "
            :to="{ name: 'upload' }"
          >
            Upload Image
          </router-link>
          <!-- <router-link
            class="step"
            :class="
              (route.name == 'colors' ||
                route.name == 'poly' ||
                route.name == 'generate') &&
              'step-primary'
            "
            :to="{ name: 'colors' }"
          >
            Change Colors
          </router-link> -->
          <router-link
            class="step"
            :class="
              (route.name == 'poly' || route.name == 'generate') &&
              'step-primary'
            "
            :to="{ name: 'poly' }"
          >
            Adjust Poly
          </router-link>
          <router-link
            class="step"
            :class="route.name == 'generate' && 'step-primary'"
            :to="{ name: 'generate' }"
          >
            Generate Image
          </router-link>
        </ul>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<!-- <div class="grid items-center w-1/4 grid-cols-2 gap-2 b">
      <div class="grid-span-1">
        <label for="Threshold">Threshold for Vertex</label>
      </div>
      <div class="grid-span-1">
        <input
          class="text-right bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          v-model="threshold"
          type="number"
          id="Threshold"
        />
      </div>

      <div class="grid-span-1">
        <label for="AcceptedN">Number of Polygons </label>
      </div>
      <div class="grid-span-1">
        <input
          class="text-right w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          v-model="acceptedN"
          type="number"
          id="AcceptedN"
        />
      </div>
      <div class="grid-span-1">
        <button
          class="w-full p-2 text-white border-2 rounded-lg border-violet-300 bg-violet-700 hover:bg-violet-400"
          @click="func()"
        >
          Generate
        </button>
      </div>
      <div class="grid-span-1">
        <button
          class="w-full p-2 text-white border-2 rounded-lg border-violet-300 bg-violet-700 hover:bg-violet-400"
          @click="downloadCanvas(canvas)"
        >
          Button
        </button>
      </div>
      <button class="btn btn-primary">Button</button>
      <button class="btn btn-secondary">Button</button>
      <button class="btn btn-accent">Button</button>
      <label
        class="flex gap-2 transition duration-150 ease-linear bg-white border border-gray-500 rounded shadow-md cursor-pointer hover:bg-green-800"
      >
        <span v-if="!file" class="py-2 pr-4">Upload File</span>
        <span v-else class="py-2 pr-4 font-mono"> {{}}</span>
        <input type="file" class="hidden" multiple @change="handleFileUpload" />
      </label>
      <input type="number" class="rounded" />
    </div> -->

<!-- <div class="flex flex-col"> -->
<!-- <div class="flex border-2"> -->
<!-- <canvas class="w-1/2" ref="canvas" /> -->
<!-- <canvas class="w-1/2" ref="canvasOrig" /> -->
<!-- <canvas class="overflow-x-hidden" ref="canvasFullSize" /> -->
<!-- <canvas class="overflow-x-hidden" ref="canvasFullSizeOrig" /> -->
<!-- </div> -->
<!-- </div> -->
<!-- </div> -->
<!-- </template> -->

<script setup>
import { store } from "../store.js";
import { ref, onMounted } from "vue";
import { getLowPoly, downloadCanvas } from "../utils.js";

const canvas = ref(null);
const ctx = ref(null);

onMounted(() => {
  // everytime this page is loaded the image needs to be loaded from the source
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

function generateLowPoly() {
  if (store.image.src) {
    const image = new Image();

    image.onload = () => {
      ctx.value = canvas.value.getContext("2d");
      canvas.value.width = image.width;
      canvas.value.height = image.height;
      ctx.value.drawImage(image, 0, 0);
      getLowPoly(canvas, ctx, store.threshold, store.acceptedN);
    };
    image.src = store.image.src;
  }
}

function downloadHelper() {
  downloadCanvas(canvas, store.fileName);
}
</script>

<template>
  <div class="flex flex-col items-center w-full gap-2">
    <div class="flex flex-col items-center w-full gap-2">
      <div class="w-full max-w-4xl card">
        <div class="card-body bg-base-100">
          <p>
            <span class="px-1 font-mono text-sm rounded bg-slate-200"
              >threshold</span
            >
            takes values between 0.001 and 1,000. A high value means the
            polygons will more strongly align to the original image's curves and
            shape.
          </p>
          <p>
            <span class="px-1 font-mono text-sm rounded bg-slate-200"
              >num_vertices</span
            >
            takes values up to 20,000. A higher number here will result in more
            polygons in the final image.
          </p>
        </div>
      </div>
      <div class="w-full max-w-xl card">
        <div class="flex flex-col md:grid md:grid-cols-2 card-body bg-base-100">
          <input
            type="number"
            :value="store.threshold"
            @change="(event) => store.mutateThreshold(event.target.value)"
            placeholder="Threshold"
            class="text-right input input-bordered input-primary"
          />
          <input
            type="number"
            :value="store.acceptedN"
            @change="(event) => store.mutateAcceptedN(event.target.value)"
            placeholder="# Vertices"
            class="text-right input input-bordered input-primary"
          />
          <div
            class="btn"
            :class="
              !!store.threshold && !!store.acceptedN
                ? 'btn-primary'
                : 'btn-disabled'
            "
            @click="generateLowPoly"
          >
            Generate
          </div>
          <div class="btn btn-secondary" @click="downloadHelper">Download</div>
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
</template>

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

const listOfFilters = ref([]);

function applyFilterToCanvas(filterName) {
  listOfFilters.value.push(filterName);
  applyFilter(canvas, ctx, filterName);
}

function removeFilters() {
  const image = new Image();

  image.onload = () => {
    ctx.value = canvas.value.getContext("2d");
    canvas.value.width = image.width;
    canvas.value.height = image.height;
    ctx.value.drawImage(image, 0, 0);
  };
  image.src = store.image.src;
}
</script>

<template>
  <div class="w-full max-w-7xl card">
    <div class="flex flex-col card-body bg-base-100">
      <div class="grid grid-cols-6">
        <div class="col-span-6">
          {{ listOfFilters }}
        </div>
        <div class="col-span-6 md:col-span-2">
          <div class="flex flex-wrap gap-2">
            <button
              class="btn btn-primary"
              @click="applyFilterToCanvas('sepia')"
            >
              Sepia
            </button>
            <div class="dropdown">
              <label tabindex="0" class="btn btn-primary">Add Filter</label>
              <ul
                tabindex="0"
                class="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
              >
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-7xl card">
      <div class="flex flex-col card-body bg-base-100">
        <div class="grid grid-cols-6 gap-2">
          <div class="col-span-6 md:col-span-2">
            <div class="dropdown">
              <label tabindex="0" class="m-1 btn btn-secondary"
                >Add Filter</label
              >
              <ul
                tabindex="0"
                class="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
              >
                <li>
                  <div @click="applyFilterToCanvas('sepia')">Sepia</div>
                </li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
            <div class="flex flex-wrap gap-2 overflow-y-auto">
              <div
                class="btn btn-primary"
                @click="applyFilterToCanvas('sepia')"
              >
                Sepia
              </div>
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
  </div>
</template>

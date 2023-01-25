<script setup>
import mountImgUrl from "../assets/mount.jpg";
import mountLowImgUrl from "../assets/mount_low_poly.jpg";

console.log(mountImgUrl);
</script>

<template>
  <div
    class="flex flex-col items-center min-h-screen gap-5 px-5 py-5 md:py-10 bg-gradient-to-br from-primary to-secondary"
  >
    <div class="max-w-xl card bg-base-100">
      <div class="text-center card-body">
        <h1 class="text-2xl font-extrabold md:text-5xl">Low Poly Maker</h1>
        <p class="flex flex-col gap-2 py-4">
          <span>
            Convert your pictures into beautiful low polygon versions with
            dozens of customization options (eventually).
          </span>
          <span class="text-xs italic text-slate-400">
            No images are stored and all the work is done in your browser with
            Javascript.
          </span>
        </p>
        <div class="grid grid-cols-2 gap-2">
          <a
            class="text-xs btn btn-secondary btn-outline"
            href="https://github.com/nithvijay/low-poly-maker"
          >
            This Website's Source Code
          </a>
          <router-link
            class="btn btn-primary btn-outline"
            :to="{ name: 'upload' }"
          >
            Start
          </router-link>
        </div>
      </div>
    </div>
    <div class="p-5 card bg-base-100">
      <div class="grid grid-cols-2">
        <div class="col-span-2 px-5 pt-2 text-center lg:col-span-1">
          <span class="mb-2 badge">before</span>
          <img class="rounded" :src="mountImgUrl" />
        </div>
        <div class="col-span-2 px-5 pt-2 pb-5 text-center lg:col-span-1">
          <span class="mb-2 badge">after</span>
          <img class="rounded" :src="mountLowImgUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

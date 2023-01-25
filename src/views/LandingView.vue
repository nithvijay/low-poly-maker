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
        <p class="py-6">
          Convert your pictures into beautiful low polygon versions with dozens
          (eventually) of customization options!
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
    <div class="p-5 max-w-screen-2xl card bg-base-100">
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

<!-- <template>
  <div
    class="w-screen h-screen hero bg-gradient-to-br from-primary to-secondary"
  >
    <div class="text-center hero-content card card-body bg-base-100">
      <div class="max-w-xl">
        <h1 class="text-5xl font-extrabold">Low Poly Maker</h1>
        <p class="py-6">
          Convert your pictures into beautiful low polygon versions with dozens
          of customization options!
        </p>
        <div class="grid grid-cols-2 gap-2">
          <a
            class="btn btn-secondary btn-outline"
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
      <div class="card"> -->
<!-- <img :src="mountImgUrl" /> -->
<!-- <img :src="mountLowImgUrl" /> -->
<!-- </div>
    </div>
  </div>
</template> -->

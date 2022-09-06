<script setup></script>

<template>
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
          <button class="btn btn-secondary btn-outline">
            This Website's Source Code
          </button>
          <router-link class="btn btn-primary btn-outline" to="/create">
            Create
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class="flex flex-col items-center pt-5">
      <div class="card bg-gradient-to-r from-base-300 to-base-100">
        <div class="card-body">
          <div
            class="p-1 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          >
            Low Poly Maker
          </div>
        </div>
      </div>
      <p class="text-2xl font-medium text-base-100">
        Create stunning low polygon images!
      </p>
      <p class="text-xl">Customize</p>
    </div> -->
  </div>
</template>

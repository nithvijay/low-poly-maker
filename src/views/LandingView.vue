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
          <router-link
            class="btn btn-primary btn-outline"
            :to="{ name: 'upload' }"
          >
            Create
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

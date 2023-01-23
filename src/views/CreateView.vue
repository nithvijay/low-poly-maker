<!-- contains all the components -->
<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
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
            exact
            to="/"
          >
            Instructions
          </router-link>
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
          <div class="step" :class="route.name == 'poly' && 'step-primary'">
            <span>Edit Image</span>
            (Coming Soon)
          </div>
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
          <!-- <router-link
            class="step"
            :class="route.name == 'generate' && 'step-primary'"
            :to="{ name: 'generate' }"
          >
            Generate Image
          </router-link> -->
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

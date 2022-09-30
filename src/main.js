import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import App from "./App.vue";
import CreateView from "./views/CreateView.vue";
import LandingView from "./views/LandingView.vue";
import UploadImage from "./components/UploadImage.vue";
import ChangeColors from "./components/ChangeColors.vue";
import AdjustPoly from "./components/AdjustPoly.vue";
import GenerateImage from "./components/GenerateImage.vue";
import "./index.css";
import { store } from "./store.js";

const routes = [
  {
    path: "/",
    component: LandingView,
  },
  {
    path: "/create",
    component: CreateView,
    name: "create",
    children: [
      {
        path: "upload",
        component: UploadImage,
        name: "upload",
      },
      {
        path: "colors",
        component: ChangeColors,
        name: "colors",
        beforeEnter: (to, from) => {
          if (!store.isImageUploaded) {
            return { name: "upload" };
          }
        },
      },
      {
        path: "poly",
        component: AdjustPoly,
        name: "poly",
        beforeEnter: (to, from) => {
          if (!store.isImageUploaded) {
            return { name: "upload" };
          }
        },
      },
      {
        path: "generate",
        component: GenerateImage,
        name: "generate",
        beforeEnter: (to, from) => {
          if (!store.isImageUploaded) {
            return { name: "upload" };
          }
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(router);

app.mount("#app");

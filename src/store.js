// store.js
import { reactive } from "vue";

export const store = reactive({
  count: 0,
  image: new Image(),
  mutateImage(src) {
    const image = new Image();
    image.src = src;
    this.image = image;
  },
});

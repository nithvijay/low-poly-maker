// store.js
import { reactive } from "vue";

export const store = reactive({
  count: 0,
  isImageUploaded: false,
  image: new Image(),
  imageHeight: null,
  imageWidth: null,
  mutateImage(src) {
    const image = new Image();
    image.src = src;
    this.image = image;
    image.onload = () => {
      this.mutateImageWidth(image.width);
      this.mutateImageHeight(image.height);
    };
  },
  mutateIsImageUploaded(isImageUploaded) {
    this.isImageUploaded = isImageUploaded;
  },
  mutateImageWidth(width) {
    this.imageWidth = width;
  },
  mutateImageHeight(height) {
    this.imageHeight = height;
  },
  fileName: "",
  mutateFileName(fileName) {
    this.fileName = fileName;
  },

  threshold: null,
  acceptedN: null,
  mutateThreshold(threshold) {
    this.threshold = threshold;
  },
  mutateAcceptedN(acceptedN) {
    this.acceptedN = acceptedN;
  },
});

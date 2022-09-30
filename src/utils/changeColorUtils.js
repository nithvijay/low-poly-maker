import * as LenaJS from "lena.js";

export const applyFilter = (canvas, ctx, filterName) => {
  var pixels = ctx.value.getImageData(
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );
  let filter = LenaJS[filterName];

  let afterFilter = filter.apply(null, [pixels, 0]);
  ctx.value.putImageData(afterFilter, 0, 0);
};

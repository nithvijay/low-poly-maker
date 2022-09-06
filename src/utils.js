import { filterImage, prewittHorizontal, grayscale, red } from "lena.js";
import Delaunator from "delaunator";

export const randInt = (max) => Math.floor(Math.random() * max);

export const getVertices = (canvas, ctx, threshold, acceptedN) => {
  var pixels = ctx.value.getImageData(
    0,
    0,
    canvas.value.width,
    canvas.value.height
  );
  let afterEdgeDetection = prewittHorizontal.apply(null, [pixels, 0]);
  let afterGrayscale = grayscale.apply(null, [afterEdgeDetection, 0]);
  ctx.value.putImageData(afterGrayscale, 0, 0);

  let d = afterGrayscale.data;
  let width = ctx.value.canvas.width;
  let height = ctx.value.canvas.height;

  let sum = 0;
  let max = 0;
  let accepted = [];

  while (accepted.length < acceptedN * 2) {
    let randWidth = randInt(width);
    let randHeight = randInt(height);
    let index = randWidth * 4 + randHeight * width * 4;
    max = max > d[index] ? max : d[index];
    sum++;
    if (randInt(100) / 100 < d[index] / threshold) {
      accepted.push(randWidth, randHeight);
    }
  }
  console.log(
    `threshold-${threshold} percentAccepted-${
      Math.round((acceptedN / sum) * 10000) / 100
    }%`
  );

  accepted.push(0, 0, 0, height, width, 0, width, height);
  return { pixels, accepted };
};

export const getPolygons = (accepted) => {
  const delaunay = new Delaunator(accepted);

  let coordinates = [];
  for (let i = 0; i < delaunay.triangles.length; i++) {
    coordinates.push([
      accepted[delaunay.triangles[i] * 2],
      accepted[delaunay.triangles[i] * 2 + 1],
    ]);
  }
  return coordinates;
};

export const drawPolygons = (coordinates, origPixels, canvas, ctx) => {
  let width = ctx.value.canvas.width;
  for (let i = 0; i < coordinates.length - 2; i += 3) {
    // only takes one vertex color
    let averageCoordX = Math.round(
      (coordinates[i][0] + coordinates[i + 1][0] + coordinates[i + 2][0]) / 3.0
    );
    let averageCoordY = Math.round(
      (coordinates[i][1] + coordinates[i + 1][1] + coordinates[i + 2][1]) / 3.0
    );
    let basePixel = averageCoordX * 4 + averageCoordY * width * 4;
    let color = `rgb(${origPixels.data[basePixel]}, ${
      origPixels.data[basePixel + 1]
    }, ${origPixels.data[basePixel + 2]})`;

    ctx.value.fillStyle = color;
    ctx.value.strokeStyle = color;

    ctx.value.beginPath();

    ctx.value.moveTo(coordinates[i][0], coordinates[i][1]);
    ctx.value.lineTo(coordinates[i + 1][0], coordinates[i + 1][1]);
    ctx.value.lineTo(coordinates[i + 2][0], coordinates[i + 2][1]);
    ctx.value.fill();
    ctx.value.stroke();
  }
};

export const getLowPoly = (canvas, ctx, threshold, acceptedN) => {
  let { pixels, accepted } = getVertices(canvas, ctx, threshold, acceptedN);
  let coordinates = getPolygons(accepted);
  drawPolygons(coordinates, pixels, canvas, ctx);
};

export const downloadCanvas = (canvas, filename) => {
  const link = document.createElement("a");
  link.href = canvas.value.toDataURL();
  link.download = `${filename}.png`;
  link.click();
  URL.revokeObjectURL(link.href);
};

export interface HtmlToImageOptions {
  quality?: number;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}

function createCanvas(element: HTMLElement, options: HtmlToImageOptions = {}) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { width = element.offsetWidth, height = element.offsetHeight } =
    options;

  canvas.width = width;
  canvas.height = height;

  return { canvas, context, width, height };
}

export async function toImage(
  element: HTMLElement,
  options: HtmlToImageOptions = {}
) {
  const { canvas, context, width, height } = createCanvas(element, options);
  const dataUrl = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${element.outerHTML}</svg>`;

  const img = new Image();
  img.src = dataUrl;

  console.log("img", dataUrl);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => {
      console.log("dataUrl", dataUrl);
      context.drawImage(img, 0, 0);
      const base64Image = canvas.toDataURL("image/png");
      console.log("base64Image", base64Image);

      resolve(img);
    };

    img.onerror = reject;
  });
}

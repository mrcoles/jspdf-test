// ## Load Image

export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = e => reject(e);
    img.src = src;
  });

export const asFilename = (path: string, newSuffix: string) =>
  path
    .split("/")
    .pop()
    .replace(/\.*$/, newSuffix);

export const downloadUrl = (url: string, filename: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

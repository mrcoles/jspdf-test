import jsPDF from "jspdf";

import { asFilename, downloadUrl, loadImage } from "./utils";

const imgElt = document.querySelector("#image") as HTMLImageElement;
const selectElt = document.querySelector("#select") as HTMLSelectElement;
const buttonElt = document.querySelector("#dl") as HTMLButtonElement;

const main = () => {
  buttonElt.addEventListener("click", onClickDownload);
};

const onClickDownload = async (evt: Event) => {
  const src = imgElt.src;
  const filename = asFilename(src, ".pdf");

  const img = await loadImage(imgElt.src);
  const { width, height } = img;

  // create a copy of the image as a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0);

  // create the PDF doc
  const format = [width, height];
  const unit = selectElt.value;

  const doc = new jsPDF({
    orientation: width > height ? "landscape" : "portrait",
    unit: unit,
    format
  });

  console.log(`unit: ${unit}`);
  console.log(
    `format: ${JSON.stringify(format)} (these are the raw image dimensions)`
  );
  console.log("pdf docWidth:", doc.internal.pageSize.getWidth());
  console.log("pdf docHeight:", doc.internal.pageSize.getHeight());

  // add an image
  doc.addImage(canvas, "JPEG", 0, 0, width, height);

  // output and download the PDF
  // TODO - issue with window.URL.createObjectURL and download when run on a remote server?
  const outputType = "bloburl";
  const output = doc.output(outputType);

  console.log("output:", output);

  downloadUrl(output, filename);
};

// ## Main

main();

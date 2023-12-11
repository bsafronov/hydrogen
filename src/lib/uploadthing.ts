import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const deleteImage = async (url: string) => {
  const res = await fetch("/api/uploadthing", {
    method: "DELETE",
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }
};

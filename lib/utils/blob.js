import { put } from "@vercel/blob";

export const uploadToBlob = async (file, folder = "blog-images") => {
  try {
    const filename = `${folder}/${Date.now()}_${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
    });

    return blob.url;
  } catch (error) {
    throw new Error(`Failed to upload to Vercel Blob: ${error.message}`);
  }
};

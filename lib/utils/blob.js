import { del, put } from "@vercel/blob";

export const uploadToBlob = async (file, folder = "blog-images") => {
  try {
    const filename = `${folder}/${Date.now()}_${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return blob.url;
  } catch (error) {
    throw new Error(`Failed to upload to Vercel Blob: ${error.message}`);
  }
};
export const deleteFromBlob = async (fileUrl) => {
  try {
    if (!fileUrl) {
      throw new Error("File URL is required for deletion");
    }
    await del(fileUrl);
    return true;
  } catch (error) {
    console.log(`Failed to delete from Vercel Blob: ${error.message}`);
    return fasle;
  }
};

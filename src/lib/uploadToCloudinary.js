const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Uploads a File object to Cloudinary via unsigned upload preset.
 * @param {File} file
 * @returns {Promise<string>} Secure URL of the uploaded image
 */
export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Cloudinary API Error Detail:', errorData);
    throw new Error(`Cloudinary upload failed: ${errorData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  return data.secure_url;
}

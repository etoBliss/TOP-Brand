/**
 * Compresses an image file for web optimization.
 * @param {File} file - The original image file
 * @param {Object} options - Compression options
 * @returns {Promise<File>} - Optimized image file
 */
export const compressImage = async (file, { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = {}) => {
  return new Promise((resolve, reject) => {
    // If the file is not an image, return it as is
    if (!file.type.startsWith('image/')) {
        return resolve(file);
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      // Cleanup the object URL immediately after load
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error('Canvas to Blob conversion failed'));
          }
          // Create a new file from the blob
          const optimizedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          
          // Log the compression result for debugging
          console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
          console.log(`Optimized size: ${(optimizedFile.size / 1024 / 1024).toFixed(2)} MB`);
          
          resolve(optimizedFile);
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Image load failed'));
    };
  });
};

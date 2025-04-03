import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../middlewares/saveFileToUploadDir.js';

export const uploadPhoto = async (file) => {
  return getEnvVar('ENABLE_CLOUDINARY') === 'true'
    ? await saveFileToCloudinary(file)
    : await saveFileToUploadDir(file);
};

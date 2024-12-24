import multiparty from 'multiparty';
import { v2 as cloudinary } from 'cloudinary';

// Configurez Cloudinary avec vos informations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new multiparty.Form();

  try {
    // Analyse les fichiers envoyés dans la requête
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ files });
      });
    });

    const links = [];

    // Upload des fichiers vers Cloudinary
    for (const file of files.file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'uploads', // Nom du dossier dans Cloudinary
      });

      links.push(result.secure_url); // Lien public du fichier dans Cloudinary
    }

    return res.json({ links });
  } catch (error) {
    console.error('Error during file upload:', error);
    return res.status(500).json({ error: 'Failed to upload files' });
  }
}

export const config = {
  api: { bodyParser: false }, // Désactive le bodyParser intégré pour gérer les fichiers
};

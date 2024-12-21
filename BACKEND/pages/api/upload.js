import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';

export default async function handle(req, res) {
  // Vérifie si la méthode est POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new multiparty.Form();

  // Analyse les fichiers envoyés dans la requête
  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files });
    });
  });

  // Définir les chemins pour le Backend et le Frontend
  const backendUploadDirectory = path.join(process.cwd(), '/public/uploads');
  const frontendUploadDirectory = path.join(process.cwd(), '../FRONTEND/public/uploads'); // Adapter le chemin vers le frontend si nécessaire

  // Crée les dossiers s'ils n'existent pas
  fs.mkdirSync(backendUploadDirectory, { recursive: true });
  fs.mkdirSync(frontendUploadDirectory, { recursive: true });

  const links = [];

  for (const file of files.file) {
    const tempPath = file.path;
    const backendTargetPath = path.join(backendUploadDirectory, file.originalFilename);
    const frontendTargetPath = path.join(frontendUploadDirectory, file.originalFilename);

    // Déplace le fichier depuis son chemin temporaire vers le dossier cible du Backend
    await new Promise((resolve, reject) => {
      fs.rename(tempPath, backendTargetPath, (err) => {
        if (err) {
          console.error('Error saving file to backend:', err);
          reject(err);
        }
        resolve();
      });
    });

    // Copie le fichier vers le répertoire du Frontend
    await new Promise((resolve, reject) => {
      fs.copyFile(backendTargetPath, frontendTargetPath, (err) => {
        if (err) {
          console.error('Error copying file to frontend:', err);
          reject(err);
        }
        resolve();
      });
    });

    // Ajoute le chemin public du fichier à la réponse
    const fileUrl = `/uploads/${file.originalFilename}`;
    links.push(fileUrl);
  }

  // Retourne les liens des fichiers enregistrés
  console.log('links:', links);
  return res.json({ links });
}

export const config = {
  api: { bodyParser: false }, // Désactive le bodyParser intégré pour gérer les fichiers
};

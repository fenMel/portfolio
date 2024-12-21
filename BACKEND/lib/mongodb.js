const { MongoClient } = require('mongodb');

// URI de connexion MongoDB (modifie en fonction de ta configuration)
const uri = "mongodb://localhost:27017";

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
  
  try {
    // Créer une instance du client MongoDB
    const client = new MongoClient(uri);

    // Connexion au serveur MongoDB
    await client.connect();

    console.log("✅ Connexion réussie à la base de données MongoDB !");

    // Retourne la base de données (change "protfolioFenziMelissa" selon ta configuration)
    return client.db("protfolioFenziMelissa");
  } catch (error) {
    console.error("❌ Échec de la connexion à MongoDB :", error.message);
    throw error;
  }
}

// Appeler la fonction pour tester la connexion
connectToDatabase()
  .then(() => {
    console.log("La connexion est opérationnelle.");
  })
  .catch((error) => {
    console.log("Erreur lors de la connexion à MongoDB :", error);
  });

module.exports = connectToDatabase;

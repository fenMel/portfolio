const { Schema, models, model } = require("mongoose");

// Définition du schéma pour les contacts
const ContactSchema = new Schema({
    name: { type: String, required: true }, // Nom de l'utilisateur
    email: { type: String, required: true }, // Adresse e-mail
    subject: { type: String, required: true }, // Sujet du message
    message: { type: String, required: true }, // Contenu du message
}, {
    timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Exportation du modèle Contact
export const Contact = models.Contact || model('Contact', ContactSchema, 'contacts');

const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true},
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Contact = models.Contact || model('Contact', ProjectSchema, 'contacts');

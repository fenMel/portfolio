import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
    try {
        // Connect to MongoDB
        await mongooseConnect();
    } catch (error) {
        return res.status(500).json({ error: "Failed to connect to the database." });
    }

    const { method } = req;

    switch (method) {
        case 'POST': {
            try {
                const { name, email, subject, message } = req.body;

                // Validate input
                if (!name || !email || !subject || !message) {
                    return res.status(400).json({ error: "All fields (name, email, subject, message) are required." });
                }

                // Create a new contact
                const contactDoc = await Contact.create({
                    name,
                    email,
                    subject,
                    message,
                });

                return res.status(201).json({ message: "Contact successfully created!", contact: contactDoc });
            } catch (error) {
                return res.status(500).json({ error: "Failed to save contact. Please try again." });
            }
        }

        case 'GET': {
            try {
                if (req.query?.id) {
                    const contact = await Contact.findById(req.query.id);
                    if (!contact) {
                        return res.status(404).json({ error: "Contact not found." });
                    }
                    return res.json(contact);
                } else {
                    const contacts = await Contact.find().sort({ createdAt: -1 });
                    return res.json(contacts);
                }
            } catch (error) {
                return res.status(500).json({ error: "Failed to fetch contacts." });
            }
        }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).json({ error: `Method ${method} not allowed.` });
    }
}

import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [messageStatus, setMessageStatus] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageStatus("Sending...");

        try {
            await axios.post('/api/contacts', formData);
            setMessageStatus("✅ Message sent successfully!");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            setMessageStatus("❌ Failed to send message. Please try again.");
        }
    };

    return (
        <>
            <div className="contactpage">
                <div className="container">
                    <div className="contactformp">
                        <div className="leftcontp">
                            <h2>Contactez-nous</h2>
                            <p>Envoyez-nous un message avec vos questions, commentaires ou besoins, et nous vous répondrons rapidement !</p>
                        </div>
                        <div className="rightcontp">
                            <form onSubmit={handleSubmit}>
                                <div className="rightcontinputs">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Nom complet"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Adresse email"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Sujet"
                                        required
                                    />
                                </div>
                                <div className="rightcontpera">
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Message"
                                        required
                                    ></textarea>
                                </div>
                                <hr />
                                <div className="righhcontsbtn flex gap-3">
                                    <button type="submit">Envoyer</button>
                                    <p>{messageStatus}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                .contactpage {
                    padding: 50px 0;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .contactformp {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 30px;
                }
                .leftcontp {
                    flex: 1;
                    max-width: 40%;
                }
                .leftcontp h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .rightcontp {
                    flex: 1;
                    max-width: 60%;
                }
                .rightcontinputs {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .rightcontinputs input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .rightcontpera textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .righhcontsbtn {
                    margin-top: 15px;
                }
                .righhcontsbtn button {
                    padding: 10px 20px;
                    background:rgb(160, 122, 243);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .righhcontsbtn button:hover {
                    background:rgb(194, 48, 227);
                }
                .righhcontsbtn p {
                    margin: 0;
                    padding-left: 15px;
                    color: #555;
                }
            `}</style>
        </>
    );
}

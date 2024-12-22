import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsPostcard } from "react-icons/bs";
import LoginLayout from "@/components/LoginLayout";

export default function ContactView() {
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID depuis l'URL

    const [contactInfo, setContactInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/contacts?id=${id}`)
                .then((response) => {
                    setContactInfo(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching contact details:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    const formatDate = (date) => {
        if (!date || isNaN(new Date(date))) return "N/A";
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(new Date(date));
    };

    return (
        <LoginLayout>
            <Head>
                <title>Contact Details</title>
            </Head>
            <div className="contact-view-page">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Contact Details</h2>
                        <h3>Admin Panel</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Contact</span>
                    </div>
                </div>

                {loading ? (
                    <p>Loading contact details...</p>
                ) : contactInfo ? (
                    <div className="contact-details">
                        <p><strong>Name:</strong> {contactInfo.name || "N/A"}</p>
                        <p><strong>Email:</strong> {contactInfo.email || "N/A"}</p>
                        <p><strong>Phone:</strong> {contactInfo.phone || "N/A"}</p>
                        <p><strong>Project:</strong> {contactInfo.project ? contactInfo.project.join(", ") : "N/A"}</p>
                        <p><strong>Subject:</strong> {contactInfo.subject || "N/A"}</p>
                        <p><strong>Message:</strong> {contactInfo.message || "N/A"}</p>
                        <p><strong>Submitted At:</strong> {formatDate(contactInfo.createdAt)}</p>
                    </div>
                ) : (
                    <p>No contact details found.</p>
                )}
            </div>
        </LoginLayout>
    );
}

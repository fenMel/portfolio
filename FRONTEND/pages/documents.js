import Head from "next/head";
import Link from "next/link";

export default function documents() {
    const documents = [
        { id: 1, name: "Certificat Cyber sécuriter ", description: "Une atteste que Melissa FENZI a suivi avec succès les coursdes quatre modules de MOOC et obtenu les scores suivants aux évaluations", file: "/documents/certificatCybersecu.pdf" },
        { id: 2, name: "Document 2", description: "Description du document 2", file: "/documents/document2.pdf" },
        { id: 3, name: "Document 3", description: "Description du document 3", file: "/documents/document3.pdf" },
    ];

    return (
        <>
            <Head>
                <title>Documents</title>
            </Head>

            <div className="servicespage">
                {/* Section Top */}
                <div className="topservices">
                    <div className="container">
                        <h2 data-aos="fade-up">Mes Documents</h2>
                        <p data-aos="fade-up">
                            Accueil <span>&gt;</span> Documents
                        </p>
                    </div>
                </div>

                {/* Section Documents */}
                <div className="centerservices">
                    <div className="container">
                        <div className="cservicesbox">
                            {documents.map((doc) => (
                                <div className="csservice" key={doc.id} data-aos="fade-right">
                                    <span>{doc.id.toString().padStart(2, "0")}</span>
                                    <div>
                                        <h2>{doc.name}</h2>
                                        {/* <img
                                            src="/img/document_icon.svg"
                                            alt="Document Icon"
                                        /> */}
                                    </div>
                                    <p>{doc.description}</p>
                                    <Link
                                       href={doc.file}
                                       className="btn-download"
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       Télécharger
                                  </Link>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

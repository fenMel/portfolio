import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { useState } from 'react';
import Blogsearch from '@/components/Blogsearch';
import Link from 'next/link';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';

export default function Blogs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData('/api/blogs');

    // Pagination logic
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length; // Total number of blogs
    const filteredBlogs = searchQuery.trim() === ''
        ? alldata
        : alldata.filter((blog) =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const indexOfFirstblog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstblog, indexOfLastblog);
    const publishedData = currentBlogs.filter((blog) => blog.status === 'publish');

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => setSearchInput(!searchInput);
    const handleSearchClose = () => setSearchInput(false);

    return (
        <>
            <Head>
                <title>Blogs</title>
            </Head>
            <div className="blogpage">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1 data-aos="fade-right">
                                <span>La cybersécurité et son rôle dans notre vie quotidienne</span>
                            </h1>
                            <p data-aos="fade-right">
                                <strong>Qu'est-ce que la cybersécurité ?</strong>
                                <br />
                                La cybersécurité est l'ensemble des pratiques, technologies et processus conçus pour protéger les systèmes informatiques, les réseaux, les données et les appareils numériques contre les cyberattaques, les accès non autorisés, les dommages et les vols.
                                <br />
                                Dans un monde de plus en plus connecté, où nos vies dépendent largement des technologies numériques, la cybersécurité joue un rôle clé dans la prévention des risques liés aux menaces numériques.
                            </p>
                            <h2>Les rôles et impacts de la cybersécurité dans notre quotidien</h2>
                            <div className="cyber-list">
                                <div className="cyber-item">
                                    <strong>1- Protection des données personnelles :</strong>
                                    <p>Chaque jour, nous partageons des informations sensibles en ligne, que ce soit pour des achats, la gestion de comptes bancaires ou l'utilisation des réseaux sociaux. La cybersécurité veille à ce que ces données restent privées et ne tombent pas entre de mauvaises mains.</p>
                                </div>
                                <div className="cyber-item">
                                    <strong>2- Sécurisation des transactions financières :</strong>
                                    <p>Les systèmes de paiement numériques sont la cible de nombreuses attaques. Grâce à des technologies comme le chiffrement, l'authentification à deux facteurs et la détection des fraudes, la cybersécurité protège nos finances.</p>
                                </div>
                                <div className="cyber-item">
                                    <strong>3- Prévention des cybercrimes :</strong>
                                    <p>Avec l'essor des ransomwares, du phishing et des malwares, les entreprises et les individus sont régulièrement confrontés à des menaces. La cybersécurité limite les risques en identifiant et en neutralisant ces attaques avant qu'elles ne causent des dommages.</p>
                                </div>
                                <div className="cyber-item">
                                    <strong>4- Protection des infrastructures critiques :</strong>
                                    <p>Les secteurs comme l'énergie, les transports, la santé et les communications reposent sur des systèmes numériques. La cybersécurité protège ces infrastructures contre les attaques qui pourraient paralyser des services essentiels.</p>
                                </div>
                                <div className="cyber-item">
                                    <strong>5- Sensibilisation et éducation :</strong>
                                    <p>Elle joue un rôle important dans la formation des utilisateurs pour adopter des comportements numériques sûrs, tels que la création de mots de passe robustes, la reconnaissance des e-mails frauduleux et la mise à jour régulière des logiciels.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="latestpostssec">
                    <div className="container">
                        <div className="border"></div>
                        <div className="latestpostsdata">
                            <div className="fetitle">
                                <h3>Latest Articles :</h3>
                            </div>
                            <div className="latestposts">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    publishedData.map((blog) => (
                                        <div className="lpost" data-aos="flip-right" key={blog._id}>
                                            <div className="lpostimg">
                                                <Link href={`/blogs/${blog.slug}`}>
                                                    <img src={blog.images[0]} alt={blog.title} />
                                                </Link>
                                            </div>
                                            <div className="lpostinfo">
                                                <h3>
                                                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                                                </h3>
                                                <p>{blog.description}</p>
                                                <h4 className="flex">
                                                    <img src="img/melissa.png" alt="Author" />
                                                    <span>FENZI Melissa</span>
                                                </h4>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        {publishedData.length > 0 && (
                            <div className="blogspaginationbtn flex flex-center mt-3">
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                {pageNumbers.map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`${currentPage === number ? 'active' : ''}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                {searchInput && <Blogsearch cls={handleSearchClose} />}
            </div>
        </>
    );
}

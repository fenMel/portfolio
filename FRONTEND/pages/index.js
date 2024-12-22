import Head from "next/head";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GrLinkedinOption } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";
import { FaCalendarDays } from "react-icons/fa6";
import Spinner from "@/components/Spinner";
import Typed from 'typed.js';

export default function Home() {




  const [selectedCategoryskill, setSelectedCategoryskill] = useState("All");

  // Données pour les technologies et outils
  const skillsData = [
    {
      category: "Frameworks",
      items: [
        { name: "Spring Boot", img: "/img/springBoot.png" },
        { name: "Angular", img: "/img/anuglar.png" },
      ],
    },
    {
      category: "Langages",
      items: [
        { name: "Java", img: "/img/java.webp" },
        { name: "PHP", img: "/img/php.png" },
        { name: "JavaScript", img: "/img/js.svg" },
        { name: "HTML & CSS", img: "/img/htmlcss.png" },
        { name: "XML", img: "/img/xml.png" },
      ],
    },
    {
      category: "Outils de Test",
      items: [
        { name: "Postman", img: "/img/postman.png" },
        { name: "JUnit", img: "/img/jUnit.png" },
      ],
    },
    {
      category: "Bases de Données",
      items: [
        { name: "phpMyAdmin", img: "/img/phpMyadmin.png" },
        { name: "MySQL", img: "/img/mysql.png" },
        { name: "MongoDB", img: "/img/mongodb.svg" },
      ],
    },
    {
      category: "Cloud et DevOps",
      items: [
        { name: "AWS Amazon", img: "/img/aws.png" },
        { name: "Docker", img: "/img/Docker.png" },
      ],
    },
    {
      category: "Outils de Gestion",
      items: [
        { name: "Jira & Confluence", img: "/img/jiraConfulence.png" },
        { name: "Trello", img: "/img/trello.png" },
        { name: "GanttProject", img: "/img/gant.png" },
      ],
    },
    {
      category: "Automatisation",
      items: [
        { name: "GitHub", img: "/img/github.svg" },
        { name: "GitLab", img: "/img/gitlab.svg" },
        { name: "CI/CD", img: "/img/ciCd.svg" },
      ],
    },
    {
      category: "Hébergeurs Web",
      items: [
        { name: "InfinityFree", img: "/img/infifree.svg" },
        { name: "OVH", img: "/img/ovh.png" },
        { name: "AlwaysData", img: "/img/alwaysData.png" },
        { name: "WordPress", img: "/img/wordpress.png" },
        { name: "Apache", img: "/img/apache.png" },
        { name: "Nginx", img: "/img/nginx.svg" },
      ],
    },
  ];

  // Filtrage des technologies et outils
  const filteredSkills =
    selectedCategoryskill === "All"
      ? skillsData.flatMap((data) => data.items)
      : skillsData.find((data) => data.category === selectedCategoryskill)?.items || [];





  // activeservice background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // Set the first item as active when mouse leaves
  };




  // services data
  const services = [
    {
      title: "Langages de programmation",
      description: "Maîtrise de HTML, CSS, JavaScript, PHP et Java pour le développement front-end et back-end, ainsi que la création d'applications robustes et dynamiques."
    },
    {
      title: "Frameworks et outils",
      description: "Expertise en Angular et Bootstrap pour des interfaces modernes, utilisation avancée de Docker pour la conteneurisation, et gestion du code avec GitLab. Familiarité avec les outils de conception comme Figma et les environnements cloud tels qu'AWS Amazon."
    },
    {
      title: "Gestion de projets",
      description: "Expérience avec Jira et Confluence pour la gestion agile, planification et organisation des tâches, et documentation collaborative."
    },
    {
      title: "Techniques (Soft Skills Techniques",
      description: "Je maîtrise l’administration des bases de données, la résolution de problèmes techniques, et la mise en place de pipelines CI/CD pour garantir des systèmes performants, fiables et adaptés au développement agile."
    },
   
    {
      title: "Interpersonnelles (Soft Skills)",
      description: "Je privilégie le travail en équipe, la communication claire de concepts techniques et une gestion efficace du temps pour garantir la productivité et le respect des échéances"
    }
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAllData] = useState([]);
  const [allwork, setAllWork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ]);

        const projectsData = await projectsResponse.json();
        const blogsData = await blogsResponse.json();

        setAllData(projectsData);
        setAllWork(blogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter projects based on selectedCategory
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory));
    }
  }, [selectedCategory, alldata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };



  // Function to format the date as "20 May 2024 14:11 pm"
  const formatDate = (date) => {
    // Check if date is valid
    if (!date || isNaN(date)) {
      return ''; // or handle the error as needed
    }

    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour12: true // Use 12-hour format
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.body.classList.contains('dark'));
    }
  }, []);


  // type js

  useEffect(() => {
    const options = {
      strings: ['UX Designer', 'Full Stack Dev', 'Backend Dev +'],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
      const typed = new Typed(typedElement, options);

      // Clean up on unmount
      return () => {
        typed.destroy();
      };
    }
  }, []);



  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/logo.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" text-anchor="middle" className="animate-stroke">HI</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right" >Je suis FENZI Melissa</span>
              <h1 className="hero_title" data-aos="fade-right" >Web Developer + <br /> <span className="typed-text">UX Designer</span> </h1>
              <div className="hero_img_box heroimgbox" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <img src="/img/melissa.png"  />
              </div>
              <div className="lead" data-aos="fade-up"  >Apprenante en deuxième année de BTS Services Informatiques aux Organisations (SIO) options en SLAM (Solutions Logicielles et Applications Métier) à l'école ESIC et en alternance avec MABINTECH SERVICE</div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link href='/img/resume.pdf' download={'/img/resume.pdf'} className="download_cv">Download CV <BiDownload /></Link>
                <ul className="hero_social">
                  <li><a href="https://fr.linkedin.com/in/fenzi-melissa-b41275290"><GrLinkedinOption /></a></li>
                  <li><a href="https://github.com/melfe28"><FaGithub /></a></li>
                </ul>
              </div>
            </div>
            <div className="heroimageright" >
              <div className="hero_img_box" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <img src='/img/melissa.png' alt="" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>1+</h3>
              <h4>Années<br />
                D'expérience</h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>5+</h3>
              <h4>Projects</h4>
            </div><div className="funfect_item" data-aos="fade-right">
              <h3>BTS</h3>
              <h4> SIO<br />Option SLAM</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2 data-aos="fade-up">Mes Compétences</h2>
            <p data-aos="fade-up">Je possède une expertise diversifiée en développement web et en gestion de projets, avec des compétences techniques, organisationnelles et interpersonnelles qui me permettent de contribuer efficacement à tout type de projet :</p>
          </div>
          <div className="services_menu" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2 data-aos="fade-up">Mes Projets</h2>
            <p data-aos="fade-up">Voici l'ensemble des projets que j'ai realiser </p>
          </div>
          <div className="project_buttons" data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="300"
            data-aos-offset="0">
            <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>All</button>
            <button className={selectedCategory === 'Website Development' ? 'active' : ''} onClick={() => setSelectedCategory('Website Development')}>Website</button>
            <button className={selectedCategory === 'App Development' ? 'active' : ''} onClick={() => setSelectedCategory('App Development')}>Apps</button>
            <button className={selectedCategory === 'E-commerce site' ? 'active' : ''} onClick={() => setSelectedCategory('E-commerce site')}>Digital</button>
            <button className={selectedCategory === 'Perfomance Evaluation' ? 'active' : ''} onClick={() => setSelectedCategory('Perfomance Evaluation')}>Content</button>
          </div>
          <div className="projects_cards">
            {loading ? <Spinner /> : (
              filteredProjects.length === 0 ? (
                <h1 className="w-100 flex flex-center mt-3">No Projects Found</h1>
              ) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard" data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}

          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1" data-aos="fade-right">
              <LuMedal />
              <h2>Mon Expérience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2023-2025</span>
                <h3>MABINTECH SERVICES</h3>
                <p>Apprenti Technicienne Système d'Information</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1" data-aos="fade-left">
              <PiGraduationCap />
              <h2>Cursus Scolaire</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card" data-aos="fade-up">
                <span>2023-2025</span>
                <h3>Esic</h3>
                <p>BTS SIO option SLAM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

 {/*  outils et tech */}
 
 <section className={`technologies ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
  <div className="container">
    {/* Titre et description */}
    <div className="project_titles">
      <h2 data-aos="fade-up">Technologies et Outils</h2>
      <p data-aos="fade-up">
        Découvrez les technologies et outils que j'utilise pour développer
        des solutions performantes, modernes et adaptées à vos besoins.
      </p>
    </div>

    {/* Boutons de filtrage avec défilement horizontal */}
    <div
      className="project_buttons"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="300"
      data-aos-offset="0"
    >
      <div className="scrollable_buttons">
        <button
          className={selectedCategoryskill === "All" ? "active" : ""}
          onClick={() => setSelectedCategoryskill("All")}
        >
          All
        </button>
        {skillsData.map((data, index) => (
          <button
            key={index}
            className={selectedCategoryskill === data.category ? "active" : ""}
            onClick={() => setSelectedCategoryskill(data.category)}
          >
            {data.category}
          </button>
        ))}
      </div>
    </div>

    {/* Cartes des technologies et outils */}
    <div className="projects_cards">
      {filteredSkills.length === 0 ? (
        <h1 className="w-100 flex flex-center mt-3">
          Aucun outil trouvé dans cette catégorie
        </h1>
      ) : (
        filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="procard"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="proimgbox">
              <img src={skill.img} alt={skill.name} />
            </div>
            <div className="procontentbox">
              <h2>{skill.name}</h2>
            </div>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Styles */}
  <style jsx>{`
    /* Boutons avec défilement horizontal */
    .scrollable_buttons {
      display: flex;
      overflow-x: auto;
      gap: 15px;
      padding: 10px 0;
      scrollbar-width: thin;
    }

    .scrollable_buttons button {
     
      padding: 10px 20px;
    
      
     
    }

    .scrollable_buttons button.active {
      background: #4a47d6;
      color: #fff;
    }

    .scrollable_buttons button:hover {
      background: #4a47d6;
      transform: scale(1.05);
    }

    .scrollable_buttons::-webkit-scrollbar {
      height: 6px; /* Hauteur de la scrollbar */
    }

    .scrollable_buttons::-webkit-scrollbar-thumb {
      background: #6c63ff; /* Couleur de la barre */
      border-radius: 10px;
    }

    .scrollable_buttons::-webkit-scrollbar-track {
      background:rgba(207, 85, 244, 0.36); /* Couleur de l'arrière-plan */
    }

    /* Cartes des technologies */
    .procard {
      width: 30%;
      height: 200px;
      margin-bottom: 20px;
    }

    .projects_cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 20px;
    }
  `}</style>
</section>


      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Veille technologique</h2>
            <p data-aos="fade-up">J'ai choisi comme veille technologique le domaine de la cybersécurité. Ce choix s'explique par l'importance croissante de la protection des données et des systèmes dans un monde de plus en plus connecté</p>

          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  {/* <span>{blog.blogcategory[0]}</span> */}
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>
        
    </>
  );
}

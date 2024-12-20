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
                <img src="/img/melissa.jpg" alt="" />
              </div>
              <div className="lead" data-aos="fade-up"  >Apprenante en deuxième année de BTS Services Informatiques aux Organisations (SIO) options en SLAM (Solutions Logicielles et Applications Métier) à l'école ESIC et en alternance avec MABINTECH SERVICE</div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link href='/' download={'/img/resume.pdf'} className="download_cv">Download CV <BiDownload /></Link>
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
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
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

   <section className="myskills">
  <div className="container">
    <div className="myskills_title">
      <h2 data-aos="fade-up">Technologies et Outils</h2>
    </div>

    {/* Frameworks */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Frameworks</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/springBoot.png" alt="Spring Boot" />
          </div>
          <p className="text-center">Spring Boot</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/anuglar.png" alt="Angular" />
          </div>
          <p className="text-center">Angular</p>
        </div>
      </div>
    </div>

    {/* Langages */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Langages de Programmation</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/java.webp" alt="Java" />
          </div>
          <p className="text-center">Java</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/php.png" alt="PHP" />
          </div>
          <p className="text-center">PHP</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/js.svg" alt="JavaScript" />
          </div>
          <p className="text-center">JavaScript</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/htmlcss.png" alt="HTML & CSS" />
          </div>
          <p className="text-center">HTML & CSS</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/xml.png" alt="XML" />
          </div>
          <p className="text-center">XML</p>
        </div>
      </div>
    </div>

    {/* Environnements de Développement et Éditeurs de Code */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Environnements de Développement et Éditeurs de Code</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/vsCode.png" alt="VS Code" />
          </div>
          <p className="text-center">VS Code</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/eclipse.svg" alt="Eclipse" />
          </div>
          <p className="text-center">Eclipse</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/IntelliJ.png" alt="IntelliJ IDEA" />
          </div>
          <p className="text-center">IntelliJ IDEA</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/Notepad.png" alt="Notepad++" />
          </div>
          <p className="text-center">Notepad++</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/AlgoBox.png" alt="Algobox" />
          </div>
          <p className="text-center">Algobox</p>
        </div>
      </div>
    </div>

    {/* Outils de Test */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Outils de Test</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/postman.png" alt="Postman" />
          </div>
          <p className="text-center">Postman</p>
        </div>
      
      <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/jUnit.png" alt="Junit" />
          </div>
          <p className="text-center">Junit</p>
        </div>
      </div>
    </div>

    {/* Outils de Base de Données */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Outils de Base de Données</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/phpMyadmin.png" alt="phpMyAdmin" />
          </div>
          <p className="text-center">phpMyAdmin</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/mysql.png" alt="MySQL" />
          </div>
          <p className="text-center">MySQL</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/mongodb.svg" alt="MongoDB" />
          </div>
          <p className="text-center">MongoDB</p>
        </div>
      </div>
    </div>

    {/* Hébergement Web */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Hébergement Web</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/infifree.svg" alt="InfinityFree" />
          </div>
          <p className="text-center">InfinityFree</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/ovh.png" alt="OVH" />
          </div>
          <p className="text-center">OVH</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/alwaysData.png" alt="AlwaysData" />
          </div>
          <p className="text-center">AlwaysData</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/wordpress.png" alt="WordPress" />
          </div>
          <p className="text-center">WordPress</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/apache.png" alt="Apache" />
          </div>
          <p className="text-center">Apache</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/nginx.svg" alt="Nginx" />
          </div>
          <p className="text-center">Nginx</p>
        </div>
      </div>
    </div>

    {/* Cloud et DevOps */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Cloud et DevOps</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/aws.png" alt="AWS Amazon" />
          </div>
          <p className="text-center">AWS Amazon</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/Docker.png" alt="Docker" />
          </div>
          <p className="text-center">Docker</p>
        </div>
      </div>
    </div>

    {/* Gestion de Code Source et Automatisation */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Gestion de Code Source et Automatisation</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/github.svg" alt="GitHub" />
          </div>
          <p className="text-center">GitHub</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/gitlab.svg" alt="GitLab" />
          </div>
          <p className="text-center">GitLab</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/ciCd.svg" alt="CI/CD" />
          </div>
          <p className="text-center">CI/CD</p>
        </div>
      </div>
    </div>

    {/* Outils de Collaboration */}
    <div className="skill_category">
      <div className="project_titles">
        <p data-aos="fade-up">Outils de Collaboration et Gestion</p>
      </div>
      <div className="myskils_cards">
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/jiraConfulence.png" alt="Jira & Confluence" />
          </div>
          <p className="text-center">Jira & Confluence</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/trello.png" alt="Trello" />
          </div>
          <p className="text-center">Trello</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/umlet.svg" alt="UMLet" />
          </div>
          <p className="text-center">UMLet</p>
        </div>
        <div className="mys_card">
          <div className="mys_inner">
            <img src="/img/gant.png" alt="GanttProject" />
          </div>
          <p className="text-center">GanttProject</p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Recent Blogs</h2>
            <p data-aos="fade-up">We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
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

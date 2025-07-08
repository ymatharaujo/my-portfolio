document.addEventListener('DOMContentLoaded', function () {
    const translations = {
        pt: {
            pageTitle: "Mateus Araújo - Engenheiro de Software",
            navAbout: "Sobre mim",
            navServices: "Serviços",
            navProjects: "Projetos",
            navStack: "Stack",
            navBlog: "Blog",
            navContact: "Contato",
            homeGreeting: "Olá, eu sou",
            typingTitles: ["Engenheiro de Software", "Engenheiro de Inteligência Artificial", "Engenheiro de Machine Learning"],
            homeCTA: "ENTRE EM CONTATO",
            aboutTitle: "Sobre Mim",
            aboutP1: "Com mais de 6 anos de experiência, minha jornada como Engenheiro de Software é movida pela curiosidade e pela busca incessante por inovação. Atuo no desenvolvimento full-stack, criando soluções robustas e centradas no usuário, com sólida expertise em tecnologias como Java, Node.js, React, Flutter e Python.",
            aboutP2: "Nos últimos anos, tenho me dedicado a aprimorar a qualidade do meu código, garantindo a aplicação das melhores práticas de desenvolvimento, como Clean Code e Clean Architecture, para construir software que não seja apenas funcional, mas também legível e escalável.",
            aboutP3: "Recentemente, meu foco tem se expandido para o fascinante universo da Inteligência Artificial. Tenho um interesse especial em explorar como o Machine Learning e as automações inteligentes podem ser aplicadas para resolver problemas complexos e entregar valor de formas inovadoras.",
            servicesTitle: "Serviços",
            service1Title: "Desenvolvimento Web",
            service1Desc: "Criação de sites e aplicações web completas, responsivas e otimizadas.",
            service2Title: "Inteligência Artificial",
            service2Desc: "Desenvolvimento de soluções e modelos de IA para automação e insights.",
            service3Title: "Machine Learning",
            service3Desc: "Implementação de algoritmos de ML para previsão e análise de dados.",
            service4Title: "Desenvolvimento de SaaS",
            service4Desc: "Criação de plataformas Software as a Service escaláveis e multitenant.",
            projectsTitle: "Projetos",
            project1Title: "Nome do Projeto 1",
            project1Desc: "Breve descrição do projeto, as tecnologias utilizadas e o desafio que ele resolveu.",
            project2Title: "Nome do Projeto 2",
            project2Desc: "Breve descrição do projeto, as tecnologias utilizadas e o desafio que ele resolveu.",
            stackTitle: "Minha Stack",
            stackCat1: "Linguagens",
            stackCat2: "Bancos de Dados",
            stackCat3: "Ferramentas",
            stackCat4: "Dados & IA",
            stackCat5: "Cloud",
            contactTitle: "Contato",
            contactSubtitle: "Tem uma ideia ou um projeto em mente? Vamos conversar!",
        },
        en: {
            pageTitle: "Mateus Araújo - Software Engineer",
            navAbout: "About",
            navServices: "Services",
            navProjects: "Projects",
            navStack: "Stack",
            navBlog: "Blog",
            navContact: "Contact",
            homeGreeting: "Hello, I'm",
            typingTitles: ["Software Engineer", "Artificial Intelligence Engineer", "Machine Learning Engineer"],
            homeCTA: "GET IN TOUCH",
            aboutTitle: "About Me",
            aboutP1: "With over 6 years of experience, my journey as a Software Engineer is driven by curiosity and a relentless pursuit of innovation. I work in full-stack development, creating robust, user-centric solutions with solid expertise in technologies like Java, Node.js, React, Flutter, and Python.",
            aboutP2: "In recent years, I have dedicated myself to improving my code quality, ensuring the application of best development practices, such as Clean Code and Clean Architecture, to build software that is not only functional but also readable and scalable.",
            aboutP3: "Recently, my focus has expanded to the fascinating universe of Artificial Intelligence. I have a special interest in exploring how Machine Learning and intelligent automations can be applied to solve complex problems and deliver value in innovative ways.",
            servicesTitle: "Services",
            service1Title: "Web Development",
            service1Desc: "Creation of complete, responsive, and optimized websites and web applications.",
            service2Title: "Artificial Intelligence",
            service2Desc: "Development of AI solutions and models for automation and insights.",
            service3Title: "Machine Learning",
            service3Desc: "Implementation of ML algorithms for prediction and data analysis.",
            service4Title: "SaaS Development",
            service4Desc: "Creation of scalable and multi-tenant Software as a Service platforms.",
            projectsTitle: "Projects",
            project1Title: "Project Name 1",
            project1Desc: "Brief description of the project, the technologies used, and the challenge it solved.",
            project2Title: "Project Name 2",
            project2Desc: "Brief description of the project, the technologies used, and the challenge it solved.",
            stackTitle: "My Stack",
            stackCat1: "Languages",
            stackCat2: "Databases",
            stackCat3: "Tools",
            stackCat4: "Data & AI",
            stackCat5: "Cloud",
            contactTitle: "Contact",
            contactSubtitle: "Have an idea or a project in mind? Let's talk!",
        }
    };

    let currentLang = 'pt';
    let typeTimeout;

    const setLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        document.querySelectorAll('[data-key]').forEach(elem => {
            const key = elem.getAttribute('data-key');
            if (translations[lang][key]) {
                elem.innerText = translations[lang][key];
            }
        });
        document.querySelectorAll('[data-key-placeholder]').forEach(elem => {
            const key = elem.getAttribute('data-key-placeholder');
            if (translations[lang][key]) {
                elem.placeholder = translations[lang][key];
            }
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
            btn.classList.toggle('text-accent', btn.getAttribute('data-lang') === lang);
        });
        startTypewriter();
    };

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setLanguage(e.target.getAttribute('data-lang'));
        });
    });

    const startTypewriter = () => {
        clearTimeout(typeTimeout);
        const typingElement = document.getElementById('typing-animation');
        if (!typingElement) return;

        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const titles = translations[currentLang].typingTitles;
            const currentTitle = titles[titleIndex];
            let displayText;
            let typeSpeed = isDeleting ? 75 : 150;

            if (isDeleting) {
                displayText = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = displayText;

            if (!isDeleting && charIndex === currentTitle.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500;
            }

            typeTimeout = setTimeout(type, typeSpeed);
        }
        type();
    };

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
            
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        if (window.pJSDom && pJSDom[0] && pJSDom[0].pJS) {
            pJSDom[0].pJS.fn.vendors.destroypJS();
        }
        particlesJS('particles-js', theme === 'dark' ? particlesConfig.dark : particlesConfig.light);
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const particlesConfig = {
        dark: { particles: { number: { value: 80 }, color: { value: "#555555" }, line_linked: { color: "#555555", opacity: 0.2 } } },
        light: { particles: { number: { value: 80 }, color: { value: "#aaaaaa" }, line_linked: { color: "#aaaaaa", opacity: 0.4 } } }
    };

    Object.assign(particlesConfig.dark, { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#555" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 2, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#555", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true }, "modes": { "grab": { "distance": 140, "line_opacity": 0.5 } } }, "retina_detect": true });
    Object.assign(particlesConfig.light, { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#aaaaaa" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#aaaaaa", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true }, "modes": { "grab": { "distance": 140, "line_opacity": 0.5 } } }, "retina_detect": true });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                mobileMenu.classList.add('hidden');
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({ top: targetSection.offsetTop - 60, behavior: 'smooth' });
                }
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('href').startsWith('#')) {
                        link.classList.toggle('active', link.getAttribute('href').substring(1) === sectionId);
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' });
    sections.forEach(section => scrollObserver.observe(section));

    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 40,
            }
        }
    });

    setLanguage('pt');
});
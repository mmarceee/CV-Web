import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Code2, 
  TerminalSquare, 
  Database,
  Cloud,
  ChevronDown,
  GraduationCap,
  Wrench,
  Send,
  ArrowUp
} from 'lucide-react';

import profileImage from "./assets/perfil.jpeg";

// Inicializa EmailJS con tu Public Key
emailjs.init("BkGGsQRN2G4rMxQeT");

// --- Datos del CV ---
const ROLES = ["Software Engineer", "Backend Developer", "Web Developer"];

const SKILLS = {
  technical: [
    { name: "C++", icon: <TerminalSquare className="w-5 h-5" /> },
    { name: "Java / Spring Boot", icon: <Code2 className="w-5 h-5" /> },
    { name: "PHP", icon: <Code2 className="w-5 h-5" /> },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
    { name: "HTML / CSS / JS", icon: <Code2 className="w-5 h-5" /> },
    { name: "Node.js", icon: <TerminalSquare className="w-5 h-5" /> },
  ],
  tools: [
    { name: "Git", icon: <TerminalSquare className="w-5 h-5" /> },
    { name: "AWS Cloud Foundations", icon: <Cloud className="w-5 h-5" /> },
  ]
};

const TIMELINE = [
  {
    type: "education",
    title: "Tecnólogo en Informática",
    institution: "Universidad Tecnológica (UTEC)",
    date: "Marzo 2023 - Actualidad",
    description: "Habilidades técnicas en C++, Java, PHP, PostgreSQL, WebServices, etc.",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    type: "education",
    title: "Bootcamp de Ciberseguridad",
    institution: "Universidad Tecnológica (UTEC) - ANDA",
    date: "Mayo 2026 - Actualidad",
    description: "Formación en fundamentos de ciberseguridad, incluyendo conceptos de seguridad de la información, amenazas cibernéticas, criptografía, seguridad en redes y aplicaciones, gestión de incidentes y cumplimiento normativo.",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    type: "education",
    title: "Desarrollo Web",
    institution: "Ceibal - Jóvenes a Programar",
    date: "Marzo 2025 - Noviembre 2025",
    description: "Habilidades técnicas en HTML, CSS, JavaScript, Node.js y bases de datos, además de competencias transversales.",
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    type: "education",
    title: "AWS Cloud Foundations",
    institution: "Universidad Tecnológica (UTEC)",
    date: "Agosto 2024 - Noviembre 2024",
    description: "Habilidades técnicas en Cloud Computing.",
    icon: <Cloud className="w-5 h-5" />
  }
];

const PROJECTS = [
  {
    title: "Sistema de Gestión de Aerolineas",
    description: "Aplicación backend construida con Java para la gestión de vuelos, rutas y paquetes de rutas de vuelo. Base de datos PostgreSQL.",
    tags: ["Java", "Spring Boot", "Tomcat Server", "PostgreSQL"],
    repoUrl: "https://github.com/mmarceee/labProgAp2025"
  },
  {
    title: "E-commerce Frontend",
    description: "Interfaz de usuario responsive para una tienda en línea. Consumo de APIs REST, carrito de compras y panel de usuario.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    repoUrl: "https://github.com/damianrovira7/Proyecto-Grupo-8"
  },
  {
    title: "Sistema de Gestión de Restaurante",
    description: "Aplicacion backend construida con C++ para la gestión de productos, ventas y asignación de empleados.",
    tags: ["C++"],
    repoUrl: "https://github.com/mmarceee/labProgAv2025"
  }
];

export default function App() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Efecto para el botón de ir arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_jfd8r07',  // Reemplaza con tu Service ID
        'template_318fa59',  // Reemplaza con tu Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'emarcenal67@gmail.com',
        }
      );

      setSubmitMessage('¡Mensaje enviado correctamente!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error) {
      setSubmitMessage('Error al enviar el mensaje. Intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Efecto para subtítulo dinámico
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 selection:bg-brand-500/30">
      
      {/* HEADER / NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-bold tracking-wider text-sm md:text-base">EM.</span>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-brand-400 transition-colors">Sobre mí</a>
            <a href="#skills" className="hover:text-brand-400 transition-colors">Habilidades</a>
            <a href="#experience" className="hover:text-brand-400 transition-colors">Trayectoria</a>
            <a href="#projects" className="hover:text-brand-400 transition-colors">Proyectos</a>
            <a href="#contact" className="hover:text-brand-400 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-20 space-y-32">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-brand-400 font-medium tracking-wide">Hola, mi nombre es</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">Ezequiel Marcenal.</h1>
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-500 h-12 md:h-16">
              Construyo como{" "}
              <span className="text-neutral-300 inline-block">
                {ROLES[currentRoleIndex]}
              </span>
              <span className="animate-pulse">_</span>
            </h2>
            
            <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed md:pt-4">
              Estudiante de Tecnólogo en Informática apasionado por el desarrollo de 
              software. Interesado en aportar bases técnicas sólidas y creatividad a equipos dinámicos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-8">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=emarcenal67@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="bg-brand-500 hover:bg-brand-400 text-neutral-950 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                Contáctame
              </a>
              <a 
                href="https://linkedin.com/in/ezequiel-marcenal" 
                target="_blank" 
                rel="noreferrer"
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/mmarceee" 
                target="_blank" 
                rel="noreferrer"
                className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all transform hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <a href="#about" className="text-neutral-500 hover:text-brand-400 transition-colors">
              <ChevronDown className="w-8 h-8" />
            </a>
          </motion.div>
        </section>

        {/* SOBRE MI */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white">01. Sobre mí</h2>
            <div className="h-[1px] bg-neutral-800 flex-1"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2 space-y-4 text-neutral-400 leading-relaxed text-lg">
              <p>
                Estudiante de Tecnólogo en informática enfocado en desarrollarme como Software Engineer.
                Recientemente completé el programa Jóvenes a Programar (JaP Ceibal) orientado al Desarrollo Web.
              </p>
              <p>
                Poseo formación previa en programación y bases de datos, enfocada en el diseño y 
                construcción de aplicaciones resolviendo problemas reales a través de proyectos académicos.
              </p>
              <p>
                Actualmente me encuentro en la búsqueda de mi primera experiencia laboral. Estoy interesado 
                en unirme a un equipo donde pueda aportar mi base técnica, mi capacidad de aprendizaje 
                continuo y continuar creciendo profesionalmente.
              </p>
              
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-neutral-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-brand-400" />
                  San José de Mayo, Uruguay
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-400" />
                  +598 99 654 895
                </div>
              </div>
            </div>
            
            {/* Foto Placeholder (como en el CV) */}
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-500 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative aspect-square rounded-2xl bg-neutral-800 overflow-hidden border border-neutral-700 flex items-center justify-center">
                  <img
                    src={profileImage}
                    alt="Foto de perfil"
                    className="object-cover w-full h-full"
                  />
              </div>
            </div>
          </div>
        </motion.section>

        {/* HABILIDADES */}
        <motion.section 
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-white">02. Habilidades</h2>
            <div className="h-[1px] bg-neutral-800 flex-1"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="bg-neutral-900/50 p-8 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <h3 className="text-xl text-white font-semibold mb-6 flex items-center gap-3">
                <Code2 className="text-brand-400" />
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.technical.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-neutral-950 px-4 py-3 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500">{skill.icon}</span>
                    <span className="font-medium text-sm text-neutral-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Platform */}
            <div className="bg-neutral-900/50 p-8 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <h3 className="text-xl text-white font-semibold mb-6 flex items-center gap-3">
                <Wrench className="text-brand-400" />
                Herramientas
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {SKILLS.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-neutral-950 px-4 py-3 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500">{tool.icon}</span>
                    <span className="font-medium text-sm text-neutral-300">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* EXPERIENCIA & EDUCACION (TIMELINE) */}
        <motion.section 
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">03. Formación y Experiencia</h2>
            <div className="h-[1px] bg-neutral-800 flex-1"></div>
          </div>

          <div className="relative border-l border-neutral-800 ml-4 md:ml-0 space-y-12">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Dot */}
                <div className="absolute w-10 h-10 bg-neutral-950 border-2 border-brand-500 rounded-full -left-5 top-0 flex items-center justify-center text-brand-400">
                  {item.icon}
                </div>
                
                <div className="bg-neutral-900/40 p-6 md:p-8 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-brand-400 font-medium">{item.institution}</p>
                    </div>
                    <span className="text-sm font-mono text-neutral-500 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800 w-fit">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROYECTOS */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-white">04. Proyectos Académicos</h2>
            <div className="h-[1px] bg-neutral-800 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-neutral-950 rounded-lg text-brand-400">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-neutral-400 mb-6 flex-1 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-auto pt-6 border-t border-neutral-800/50">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono text-brand-400 bg-brand-400/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center bg-neutral-950 hover:bg-brand-500 hover:text-neutral-950 text-neutral-300 border border-neutral-800 transition-colors font-medium py-2.5 rounded-lg"
                  >
                    Ver Repositorio
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CONTACTO */}
        <motion.section 
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24 max-w-2xl mx-auto text-center"
        >
          <p className="text-brand-400 font-mono mb-4 pr-1">05. ¿Qué sigue?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ponte en Contacto</h2>
          <p className="text-neutral-400 mb-10 text-lg">
            Actualmente estoy buscando activamente mi primera oportunidad laboral. 
            Si tienes alguna oferta, pregunta o simplemente quieres saludar, ¡mi bandeja de entrada está abierta!
          </p>

          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl text-left space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Nombre</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-lg px-4 py-3 outline-none transition-colors text-white placeholder-neutral-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-lg px-4 py-3 outline-none transition-colors text-white placeholder-neutral-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Mensaje</label>
              <textarea 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Hola Ezequiel, me gustaría hablar contigo sobre..."
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-lg px-4 py-3 outline-none transition-colors text-white placeholder-neutral-600 resize-none"
              ></textarea>
            </div>
            {submitMessage && (
              <div className={`text-center text-sm font-medium ${submitMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {submitMessage}
              </div>
            )}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-500 hover:bg-brand-400 disabled:bg-neutral-600 text-neutral-950 font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 py-8 text-center bg-neutral-950">
        <p className="text-neutral-500 text-sm">
          Diseñado y construido por Ezequiel Marcenal &copy; {new Date().getFullYear()}
        </p>
      </footer>

      {/* Botón Volver Arriba */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-brand-500 text-neutral-950 hover:bg-brand-400 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none cursor-default'
        }`}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

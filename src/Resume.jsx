import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Mail, Phone, Linkedin, Github, MapPin, Award, Book, Code, Briefcase } from 'lucide-react';

function Resume() {
  const resumeRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (currentScale) => ({ 
      opacity: 1, 
      scale: currentScale,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }),
    hover: (currentScale) => ({
        scale: currentScale * 1.02,
        transition: { duration: 0.3 }
    })
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    hover: { 
      scale: 1.01, 
      transition: { duration: 0.2 } 
    }
  };

   const sidebarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } 
    }
  };

  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
        // A4 Dimensions in pixels (approx 96 DPI) -> 210mm = 794px, 297mm = 1123px
        // We use a base width for calculation, but valid CSS aspect ratio handles layout 
        // Logic: Fit the height (1123px equivalent or just container height) into window height
        
        const contentHeight = 1123; // Approximate A4 height in pixels
        const contentWidth = 794; // Approximate A4 width in pixels
        
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        // Calculate scale needed to fit width and height with some padding
        const scaleH = (windowHeight - 100) / contentHeight; // 100px vertical padding buffer for mobile spacing
        const scaleW = (windowWidth - 40) / contentWidth;  // 40px horizontal padding buffer
        
        // Choose the smaller scale to ensure it fits both dimensions
        const fitScale = Math.min(scaleH, scaleW, 1); // Cap at 1 to prevent upscaling blur
        
        setScale(fitScale);
    };

    handleResize(); // Initial calc
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans overflow-hidden">
      
      {/* Floating Download Button */}
      <motion.a
        href="/resume.pdf"
        download="Devraj_Saini_Resume.pdf"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all z-50 print:hidden"
        title="Download PDF"
      >
        <Download size={24} />
      </motion.a>

      {/* Resume Paper Wrapper with Scale */}
      <motion.div 
        className="origin-top shadow-2xl rounded-sm overflow-hidden flex flex-row bg-white mt-20 mb-10 md:my-8"
        style={{ 
            width: '210mm', 
            height: '297mm'
        }}
        custom={scale}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        {/* Left Column (Main Content) */}
        <div ref={resumeRef} className="p-8 sm:p-10 text-gray-800 w-[65%] flex flex-col gap-6">
            
            {/* Header */}
            <header className="border-b-2 border-gray-100 pb-5">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight"
                >
                    Devraj Saini
                </motion.h1>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-gray-600 font-medium">
                    {[
                        { icon: Mail, text: "devrajsaini2005@gmail.com", href: "mailto:devrajsaini2005@gmail.com" },
                        { icon: Phone, text: "+91 9528551448", href: null },
                        { icon: Linkedin, text: "linkedin.com/in/devraj-saini", href: "https://www.linkedin.com/in/devraj-saini-54476b267/" },
                        { icon: Github, text: "github.com/devraj1608", href: "https://github.com/devraj1608" },
                        { icon: MapPin, text: "Ghaziabad, India", href: null }
                    ].map((item, index) => (
                        <motion.a 
                            key={index}
                            href={item.href}
                            target={item.href && item.href.startsWith('http') ? "_blank" : undefined}
                            rel="noreferrer"
                            whileHover={{ scale: 1.05, color: "#2563eb" }}
                            className={`flex items-center gap-1.5 transition-colors ${!item.href ? 'cursor-default' : 'hover:text-blue-600'}`}
                        >
                            <item.icon size={14} className="text-blue-600 shrink-0" /> {item.text}
                        </motion.a>
                    ))}
                </div>
            </header>

            {/* Summary */}
            <motion.section variants={sectionVariants} whileHover="hover" className="p-2 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                        <Award size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Summary</h2>
                </div>
                    <p className="text-gray-700 leading-relaxed text-[13px] text-justify">
                    Computer Science Engineering student currently in the Final Year (7th Semester) of B.Tech at IMS Engineering College, affiliated with AKTU University (Expected Graduation: 2026). Strong foundation in programming, problem-solving, and full-stack software development, with hands-on experience in building real-world projects.
                    </p>
            </motion.section>

            {/* Experience & Projects */}
            <motion.section variants={sectionVariants}>
                <div className="flex items-center gap-2.5 mb-4 p-2 -mx-3 pb-0">
                    <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                        <Code size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Experience & Projects</h2>
                </div>
                
                <div className="space-y-2">
                    {[
                        {
                            title: "CodePairArena - Interactive Coding Platform",
                            meta: "Live Demo | MERN",
                            details: [
                                "Real-time coding & interview platform with Monaco Editor and multi-language support.",
                                "Features collaborative coding rooms, chat, and sync via WebSockets / socket.io & WebRTC.",
                                "High-performance backend with Node.js, Express, MongoDB and secure REST APIs."
                            ]
                        },
                        {
                            title: "Portfolio Website",
                            meta: "Live Demo | React",
                            link: "https://www.devrajsaini.online/",
                            details: [
                                "Responsive personal portfolio built with React.js, Tailwind CSS, Three.js, and Framer Motion.",
                                "Implemented 3D interactions, smooth page transitions, and contact form integration."
                            ]
                        },
                        {
                            title: "Image-QR Generator",
                            meta: "Git Repo | JS",
                            details: [
                                "Interactive tool converting images & text to QR codes using Bit Manipulation techniques.",
                                "Optimized rendering logic for fast generation and responsive layout."
                            ]
                        },
                        {
                            title: "Weather App",
                            meta: "Git Repo | API",
                            details: [
                                "Real-time weather dashboard integrated with OpenWeather API.",
                                "Dynamic UI displaying live metrics (temp, humidity, wind) with location-based detection."
                            ]
                        },
                        {
                            title: "OCR Receipt Scanner",
                            meta: "Android | Kotlin",
                            details: [
                                "Android app using OCR to extract and process text from physical receipts.",
                                "Built with XML layouts and real-time image processing algorithms."
                            ]
                        }
                    ].map((project, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                            className="p-3 -mx-3 rounded-xl transition-all"
                        >
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900 text-[14px]">{project.title}</h3>
                                {project.link ? (
                                    <a 
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[10px] uppercase tracking-wide font-bold text-blue-600 border border-blue-100 px-2 py-0.5 rounded bg-blue-50 ml-2 whitespace-nowrap"
                                    >
                                        {project.meta}
                                    </a>
                                ) : (
                                    <span className="text-[10px] uppercase tracking-wide font-bold text-blue-600 border border-blue-100 px-2 py-0.5 rounded bg-blue-50 ml-2 whitespace-nowrap">{project.meta}</span>
                                )}
                            </div>
                            <ul className="space-y-1 list-disc list-outside ml-3 text-[12px] text-gray-700 leading-normal marker:text-blue-400">
                                {project.details.map((detail, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: detail.replace(/<strong>/g, '<strong class="font-semibold text-gray-900">') }} />
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

        </div>

        {/* Right Column (Sidebar) */}
        <motion.div 
            variants={sidebarVariants}
            className="w-[35%] bg-gray-50 border-l border-gray-100 p-8 sm:p-8 flex flex-col gap-8"
        >
            
            {/* Education */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white shadow-sm rounded-lg text-blue-600">
                        <Book size={18} />
                    </div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Education</h2>
                </div>
                <div className="space-y-4 text-[12px]">
                    {[
                        { title: "B.Tech in CS", year: "2026 (Expected)", school: "IMS Engineering College" },
                        { title: "Intermediate (12th)", year: "2022", school: "Tagore Shiksha Sadan" },
                        { title: "High School (10th)", year: "2020", school: "Tagore Shiksha Sadan" }
                    ].map((edu, i) => (
                        <motion.div key={i} whileHover={{ x: 5 }} className="transition-transform">
                            <strong className="block text-gray-900 font-bold mb-0.5">{edu.title}</strong>
                            <span className="text-[11px] text-gray-500 block mb-0.5 font-medium">{edu.year}</span>
                            <div className="text-gray-700">{edu.school}</div>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* Technical Skills */}
            <section>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white shadow-sm rounded-lg text-blue-600">
                        <Code size={18} />
                    </div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Skills</h2>
                </div>
                <div className="space-y-3 text-[12px]">
                    {[
                        { label: "Languages", val: "Python, C++, Java, JavaScript" },
                        { label: "Frontend", val: "React.js, HTML5, CSS3, Tailwind" },
                        { label: "Backend", val: "Node.js, Express, REST APIs" },
                        { label: "Databases", val: "MySQL, MongoDB" },
                        { label: "Tools", val: "Git, GitHub, VS Code" }
                    ].map((skill, i) => (
                        <motion.div key={i} whileHover={{ x: 5 }} className="transition-transform">
                            <span className="font-bold text-gray-900 block mb-0.5">{skill.label}</span>
                            <div className="text-gray-600 leading-snug">{skill.val}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Achievements */}
                <section>
                <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white shadow-sm rounded-lg text-blue-600">
                        <Award size={18} />
                    </div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Honors</h2>
                </div>
                <ul className="space-y-2 list-disc list-outside ml-3 text-[12px] text-gray-700 marker:text-blue-500">
                    {[
                        "Ranked high on LeetCode.",
                        "Certified in Python & Java.",
                        "Won college Hackathon."
                    ].map((honor, i) => (
                        <motion.li key={i} whileHover={{ x: 3 }} className="transition-transform">{honor}</motion.li>
                    ))}
                </ul>
            </section>
            
            {/* Certifications */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-white shadow-sm rounded-lg text-blue-600">
                        <Briefcase size={18} />
                    </div>
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Certificates</h2>
                </div>
                <ul className="space-y-2 list-disc list-outside ml-3 text-[12px] text-gray-700 marker:text-blue-500">
                        {[
                        'Web Dev Training', 
                        'Python Basics', 
                        'Java Concepts', 
                        'React.js Cert'
                        ].map((cert, i) => (
                            <motion.li key={i} whileHover={{ x: 3, color: "#2563eb" }} className="transition-colors cursor-default">
                                {cert}
                            </motion.li>
                        ))}
                </ul>
            </section>

        </motion.div>
      </motion.div>
    </div>
  );
}
export default Resume;

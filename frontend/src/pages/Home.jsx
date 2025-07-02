import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Code2,
  Database,
  Globe,
  Mail,
  Github,
  Linkedin,
  Download,
  Server,
  Smartphone,
  Zap,
  Coffee,
  ArrowRight,
  MapPin,
  Calendar,
  ExternalLink,
  Star,
  Quote,
  Send,
  Phone,
  MessageCircle,
  Briefcase,
  Users,
} from "lucide-react";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { name: "React.js", icon: Code2, category: "Frontend" },
    { name: "Next.js", icon: Zap, category: "Framework" },
    { name: "Node.js", icon: Server, category: "Backend" },
    { name: "Express.js", icon: Globe, category: "Backend" },
    { name: "MongoDB", icon: Database, category: "Database" },
    { name: "JavaScript", icon: Code2, category: "Language" },
    { name: "TypeScript", icon: Code2, category: "Language" },
    { name: "Tailwind CSS", icon: Smartphone, category: "Styling" },
    { name: "React Redux", icon: Code2, category: "State Management" },
    { name: "RTK Query", icon: Database, category: "Data Fetching" },
    { name: "OOP", icon: Code2, category: "Programming" },
    { name: "DBMS", icon: Database, category: "Database" },
    { name: "DSA", icon: Zap, category: "Algorithms" },
    { name: "Responsive Design", icon: Smartphone, category: "Design" },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application built with Next.js and Redux. Real-time updates and team collaboration features.",
      technologies: ["Next.js", "Redux", "Socket.io", "PostgreSQL"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media management with data visualization and automated reporting features.",
      technologies: ["React", "Chart.js", "Express", "MongoDB"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Usama delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "CTO at StartupXYZ",
      content:
        "Working with Usama was a pleasure. He understood our requirements perfectly and delivered a scalable solution that exceeded our expectations.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      role: "Founder at DigitalAgency",
      content:
        "Usama's full-stack development skills are outstanding. He built our entire web application from scratch and it's performing flawlessly.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [-20, 20, -20],
            y: [-20, 20, -20],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Mouse Follower - Hidden on mobile */}
      <motion.div
        className="fixed w-6 h-6 bg-blue-500/20 rounded-full blur-xl pointer-events-none z-50 hidden lg:block"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/10 border-b border-white/[0.05]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <a href="#top">
              <motion.div
                className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Usama Razaaq
              </motion.div>
              </a>
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                {["About", "Skills", "Featured", "Testimonials", "Contact"].map(
                  (item) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.a>
                  )
                )}
              </div>
              <motion.div
                className="flex space-x-3 sm:space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.a
                  href="https://github.com/usama387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            {/* Profile Image Placeholder */}
            <motion.div
              variants={itemVariants}
              className="mb-6 sm:mb-8 flex justify-center"
            >
              <motion.div
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code2 className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-blue-400" />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3 sm:mb-4">
                Usama Razaaq
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </motion.div>
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 font-medium">
                  Full-Stack Web Developer
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Available Worldwide</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Open to Work</span>
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              Passionate about creating exceptional web experiences with modern
              technologies. Specializing in the MERN stack and Next.js to build
              scalable, performant applications.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="mailto:usamarazaaq3@gmail.com">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white px-6 sm:px-8 py-3 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                Technical Skills
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Proficient in modern web technologies with a focus on creating
                robust, scalable applications
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300 h-full">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="mb-3 sm:mb-4 flex justify-center">
                        <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-300">
                          <skill.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                        {skill.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-white/[0.05] text-gray-400 border-white/[0.08] text-xs"
                      >
                        {skill.category}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                A showcase of my recent work and the technologies I've used to
                bring ideas to life
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300 h-full overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                      <Briefcase className="w-12 h-12 text-blue-400" />
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="font-bold text-white mb-2 text-lg sm:text-xl">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </motion.a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-8">
                About Me
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] shadow-2xl shadow-black/20">
                <CardContent className="p-6 sm:p-8 lg:p-12">
                  <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                    <p>
                      Hello! I'm Usama Razaaq, a passionate full-stack web
                      developer with expertise in the MERN stack and Next.js. I
                      completed my Bachelor's in Software Engineering from Iqra
                      University, Main Campus. I love creating digital
                      experiences that are not only visually appealing but also
                      highly functional and user-friendly.
                    </p>
                    <p>
                      My journey in web development started with a curiosity
                      about how websites work, and it has evolved into a deep
                      passion for building scalable, performant applications. I
                      specialize in React.js, Node.js, Express.js, MongoDB, and
                      Next.js, always staying updated with the latest industry
                      trends and best practices.
                    </p>
                    <p>
                      When I'm not coding, you can find me exploring new
                      technologies, contributing to open-source projects, or
                      sharing knowledge with the developer community. I believe
                      in writing clean, maintainable code and creating solutions
                      that make a real impact.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                What Clients Say
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Don't just take my word for it - here's what some of my clients
                have to say about working with me
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300 h-full">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-blue-400 mb-4" />
                      </div>
                      <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">
                              {testimonial.name}
                            </h4>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
                Ready to start your next project? I'd love to hear from you.
                Send me a message and let's discuss how we can work together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                      Let's Connect
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-white font-medium">
                            usamarazaaq3@gmail.com
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Phone</p>
                          <p className="text-white font-medium">
                            +923193507558
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Response Time</p>
                          <p className="text-white font-medium">
                            Within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                  <CardContent className="p-6 sm:p-8">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-gray-200 text-sm font-medium"
                          >
                            Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-gray-200 text-sm font-medium"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-gray-200 text-sm font-medium"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          placeholder="Project inquiry"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-gray-200 text-sm font-medium"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl resize-none"
                          required
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 shadow-2xl shadow-blue-500/10">
              <CardContent className="p-8 sm:p-12">
                <a href="mailto:usamarazaaq3@gmail.com">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                    Let's Work Together
                  </h2>
                </a>
                <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                  Ready to bring your ideas to life? I'm always excited to work
                  on new projects and collaborate with amazing people. Let's
                  create something extraordinary together.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-base sm:text-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm sm:text-base">
                © 2024 Usama Razaaq. All rights reserved.
              </div>
              <div className="flex space-x-4 sm:space-x-6">
                <motion.a
                  href="mailto:contact@example.com"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
                <motion.a
                  href="https://github.com/usama387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

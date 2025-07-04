import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Share2,
  Heart,
  Eye,
  Code2,
  Loader2,
} from "lucide-react";
import { useGetProjectByIdQuery } from "@/features/api/projectApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SingleProject = () => {
  
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetProjectByIdQuery(id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Use actual project data when available
  const project = data?.project;

  const nextImage = () => {
    if (!project?.imageUrl) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.imageUrl.length);
  };

  const prevImage = () => {
    if (!project?.imageUrl) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.imageUrl.length) % project.imageUrl.length
    );
  };

  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    if (!project?.imageUrl) return;
    setLightboxImageIndex((prev) => (prev + 1) % project.imageUrl.length);
  };

  const prevLightboxImage = () => {
    if (!project?.imageUrl) return;
    setLightboxImageIndex(
      (prev) => (prev - 1 + project.imageUrl.length) % project.imageUrl.length
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
        <Loader2 className="h-12 w-12 animate-spin text-gray-300" />
        <p className="text-lg font-medium text-gray-300">Just a moment...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
        <div className="text-white text-xl">Project not found</div>
      </div>
    );
  }

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
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
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
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => window.history.back()}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Projects</span>
                </motion.button>
                <div className="h-4 w-px bg-white/20" />
                <motion.div
                  className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Usama Razaaq
                </motion.div>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked
                      ? "text-red-400 bg-red-500/10"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                </motion.button>
                <motion.button
                  className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="pt-20 sm:pt-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
          >
            {/* Project Header */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created {formatDate(project.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Updated {formatDate(project.updatedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>1.2k views</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Demo
                      </Button>
                    </motion.a>
                  )}
                  {project.repoUrl && (
                    <motion.a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white px-6 py-3 rounded-xl"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
                  <CardContent className="p-0">
                    {/* Main Image Display */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                      <img
                        src={
                          project.imageUrl?.[currentImageIndex] ||
                          "/placeholder.svg"
                        }
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {/* Image Navigation Arrows */}
                      {project.imageUrl?.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Expand Button */}
                      <button
                        onClick={() => openLightbox(currentImageIndex)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      {/* Image Counter */}
                      {project.imageUrl?.length > 1 && (
                        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                          {currentImageIndex + 1} / {project.imageUrl.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Navigation */}
                    {project.imageUrl?.length > 1 && (
                      <div className="p-4 bg-white/[0.02]">
                        <div className="flex space-x-3 overflow-x-auto pb-2">
                          {project.imageUrl.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                index === currentImageIndex
                                  ? "border-blue-500 ring-2 ring-blue-500/20"
                                  : "border-white/20 hover:border-white/40"
                              }`}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Project Info Sidebar */}
              <motion.div variants={itemVariants} className="space-y-6">
                {/* Description */}
                <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      About This Project
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Tech Stack */}
                <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Code2 className="w-5 h-5 mr-2" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Stats */}
                <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Project Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Status</span>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                          Completed
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white">3 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Team Size</span>
                        <span className="text-white">Solo Project</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Category</span>
                        <span className="text-white">Full-Stack</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen bg-black/95 border-0 p-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            {project.imageUrl?.length > 1 && (
              <>
                <button
                  onClick={prevLightboxImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextLightboxImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Image */}
            <img
              src={
                project.imageUrl?.[lightboxImageIndex] || "/placeholder.svg"
              }
              alt={`${project.title} - Full size ${lightboxImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image Counter */}
            {project.imageUrl?.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white">
                {lightboxImageIndex + 1} of {project.imageUrl.length}
              </div>
            )}

            {/* Thumbnail Strip */}
            {project.imageUrl?.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
                {project.imageUrl.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setLightboxImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      index === lightboxImageIndex
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleProject;
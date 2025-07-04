import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Code2,
  Plus,
  ExternalLink,
  Github,
  Calendar,
  Search,
  Filter,
  ImageIcon,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import {
  useAddProjectMutation,
  useGetAllProjectsQuery,
} from "@/features/api/projectApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([null]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: [""],
    liveUrl: "",
    repoUrl: "",
  });

  // Fetch projects from API
  const {
    data: projectsData,
    isLoading: loadingProjects,
    isError,
    refetch,
  } = useGetAllProjectsQuery();

  const allProjects = projectsData?.projects || [];

  // Mutation for adding project
  const [addProject, { isLoading }] = useAddProjectMutation();

  // Add image field
  const addImageField = () => {
    if (imageFiles.length < 5) {
      setImageFiles([...imageFiles, null]);
    }
  };

  // Remove image field
  const removeImageField = (index) => {
    if (imageFiles.length > 1) {
      const newImages = [...imageFiles];
      newImages.splice(index, 1);
      setImageFiles(newImages);
    }
  };

  // Handle image change
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const newImages = [...imageFiles];
    newImages[index] = file;
    setImageFiles(newImages);
  };

  // Get all unique technologies for filter
  const allTechnologies = [
    ...new Set(allProjects.flatMap((project) => project.techStack)),
  ];

  // Filter projects based on search and tech filter
  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech =
      selectedTech === "" || project.techStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  //  In the form submit handler:
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      formData.techStack.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate at least one image is uploaded
    if (imageFiles.every((file) => file === null)) {
      toast.error("Please upload at least one image");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      "techStack",
      JSON.stringify(formData.techStack.filter((tech) => tech.trim() !== ""))
    );
    formDataToSend.append("liveUrl", formData.liveUrl || "");
    formDataToSend.append("repoUrl", formData.repoUrl || "");

    // Append image files
    imageFiles.forEach((file, index) => {
      if (file) {
        formDataToSend.append(`image${index + 1}`, file);
      }
    });

    try {
      await toast.promise(addProject(formDataToSend).unwrap(), {
        loading: "Creating your project...",
        success: (data) => {
          // Reset form
          setFormData({
            title: "",
            description: "",
            techStack: [""],
            liveUrl: "",
            repoUrl: "",
          });
          setImageFiles([null]);
          setIsDialogOpen(false);
          refetch(); // Refresh projects list
          return data.message || "Project created successfully!";
        },
        error: (error) => {
          console.error("Project creation failed:", error);
          return error.data?.message || "Failed to create project";
        },
      });
    } catch (error) {
      // This will catch any unexpected errors
      toast.error("An unexpected error occurred");
    }
  };

  const addArrayField = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""],
    }));
  };

  const removeArrayField = (fieldName, index) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };

  const updateArrayField = (fieldName, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  // Skeleton component for loading state
  const ProjectSkeleton = () => (
    <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] h-full overflow-hidden">
      <Skeleton className="aspect-video w-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-none" />
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3 bg-gray-700" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full bg-gray-800" />
          <Skeleton className="h-4 w-5/6 bg-gray-800" />
          <Skeleton className="h-4 w-4/6 bg-gray-800" />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full bg-gray-700" />
          ))}
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24 bg-gray-800" />
          <Skeleton className="h-4 w-24 bg-gray-800" />
        </div>
      </CardContent>
    </Card>
  );

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
              <motion.div
                className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Usama Razaaq
              </motion.div>
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                {["Home", "About", "Skills", "Projects", "Contact"].map(
                  (item) => (
                    <motion.a
                      key={item}
                      href={
                        item === "Projects" ? "#" : `/#${item.toLowerCase()}`
                      }
                      className={`text-sm lg:text-base transition-colors ${
                        item === "Projects"
                          ? "text-blue-400 font-semibold"
                          : "text-gray-300 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.a>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="pt-20 sm:pt-24">
          {/* Header Section */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
                  My Projects
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                  A collection of projects I've worked on, showcasing my skills
                  in full-stack development
                </p>
              </motion.div>

              {/* Controls Section */}
              <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        value={selectedTech}
                        onChange={(e) => setSelectedTech(e.target.value)}
                        className="pl-10 pr-8 py-2 w-full sm:w-48 bg-white/[0.03] border border-white/[0.08] text-white rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 appearance-none"
                      >
                        <option value="">All Technologies</option>
                        {allTechnologies.map((tech) => (
                          <option
                            key={tech}
                            value={tech}
                            className="bg-gray-800"
                          >
                            {tech}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Add Project Button */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Project
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-white/[0.08] text-white">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          Create New Project
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Add a new project to your portfolio. Fill in the
                          details below.
                        </DialogDescription>
                      </DialogHeader>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-gray-200">
                            Project Title
                          </Label>
                          <Input
                            id="title"
                            placeholder="Enter project title"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                            className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                            required
                          />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="description"
                            className="text-gray-200"
                          >
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your project..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl resize-none"
                            required
                          />
                        </div>

                        {/* Image Upload Section */}
                        <div className="space-y-2">
                          <Label className="text-gray-200 flex items-center">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Project Images (max 5)
                          </Label>
                          {imageFiles.map((_, index) => (
                            <div
                              key={index}
                              className="flex gap-2 items-center"
                            >
                              <input
                                type="file"
                                onChange={(e) => handleImageChange(index, e)}
                                className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl p-2 w-full"
                              />
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeImageField(index)}
                                  className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          {imageFiles.length < 5 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={addImageField}
                              className="w-full bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Image
                            </Button>
                          )}
                        </div>

                        {/* Tech Stack */}
                        <div className="space-y-2">
                          <Label className="text-gray-200 flex items-center">
                            <Code2 className="w-4 h-4 mr-2" />
                            Tech Stack
                          </Label>
                          {formData.techStack.map((tech, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                placeholder="Enter technology"
                                value={tech}
                                onChange={(e) =>
                                  updateArrayField(
                                    "techStack",
                                    index,
                                    e.target.value
                                  )
                                }
                                className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                              />
                              {formData.techStack.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    removeArrayField("techStack", index)
                                  }
                                  className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => addArrayField("techStack")}
                            className="w-full bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Technology
                          </Button>
                        </div>

                        {/* URLs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="liveUrl"
                              className="text-gray-200 flex items-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live URL (Optional)
                            </Label>
                            <Input
                              id="liveUrl"
                              placeholder="https://example.com"
                              value={formData.liveUrl}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  liveUrl: e.target.value,
                                })
                              }
                              className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="repoUrl"
                              className="text-gray-200 flex items-center"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Repository URL (Optional)
                            </Label>
                            <Input
                              id="repoUrl"
                              placeholder="https://github.com/username/repo"
                              value={formData.repoUrl}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  repoUrl: e.target.value,
                                })
                              }
                              className="bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            className="bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white"
                            disabled={isLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                              </span>
                            ) : (
                              "Create Project"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>

              {/* Projects Grid */}
              <motion.div variants={itemVariants}>
                <AnimatePresence>
                  {loadingProjects ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                          <ProjectSkeleton />
                        </motion.div>
                      ))}
                    </div>
                  ) : isError ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <Code2 className="w-16 h-16 text-red-500/50 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-red-400 mb-2">
                        Failed to load projects
                      </h3>
                      <p className="text-gray-500">Please try again later</p>
                      <Button
                        onClick={refetch}
                        className="mt-4 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        Retry
                      </Button>
                    </motion.div>
                  ) : filteredProjects.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">
                        No projects found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="group"
                        >
                          <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 transition-all duration-300 h-full overflow-hidden">
                            {/* Project Image */}
                            <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center relative overflow-hidden">
                              {project.imageUrl.length > 0 &&
                              project.imageUrl[0] ? (
                                <img
                                  src={
                                    project.imageUrl[0] || "/placeholder.svg"
                                  }
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Code2 className="w-12 h-12 text-blue-400" />
                              )}
                              {project.imageUrl.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
                                  +{project.imageUrl.length - 1}
                                </div>
                              )}
                            </div>

                            <CardContent className="p-6">
                              {/* Project Header */}
                              <div className="mb-4">
                                <h3 className="font-bold text-white mb-2 text-lg group-hover:text-blue-300 transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                  {project.description}
                                </p>
                              </div>

                              {/* Tech Stack */}
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                  {project.techStack.slice(0, 4).map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="secondary"
                                      className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.techStack.length > 4 && (
                                    <Badge
                                      variant="secondary"
                                      className="bg-gray-500/10 text-gray-400 border-gray-500/20 text-xs"
                                    >
                                      +{project.techStack.length - 4}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Project Links */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex space-x-3">
                                  {project.liveUrl && (
                                    <motion.a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <ExternalLink className="w-4 h-4 mr-1" />
                                      Live
                                    </motion.a>
                                  )}
                                  {project.repoUrl && (
                                    <motion.a
                                      href={project.repoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <Github className="w-4 h-4 mr-1" />
                                      Code
                                    </motion.a>
                                  )}
                                </div>
                                <div className="flex items-center text-gray-500 text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(project.createdAt)}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex space-x-2">
                                <Link to={`/projects/${project.id}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white text-xs"
                                  >
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white text-xs"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Projects;

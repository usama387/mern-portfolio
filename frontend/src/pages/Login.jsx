import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Login = () => {
  // State management
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Separate form states
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // API hooks
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: isRegistering,
      isSuccess: successInRegistration,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: isLoggingIn,
      isSuccess: successInLogin,
    },
  ] = useLoginUserMutation();

  // Handle API response for registeration
  // Handle API responses
  useEffect(() => {
    // Registration responses
    if (successInRegistration) {
      toast.success("Account created successfully! Please sign in.");
      setSignUpData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setMode("login");
    }

    if (registerError) {
      toast.error(
        registerError.data?.message || "Registration failed. Please try again."
      );
    }

    // Login responses
    if (successInLogin) {
      toast.success("Welcome Back!");
      // Here you would typically redirect or set user state
    }

    if (loginError) {
      toast.error(
        loginError.data?.message || "Login failed. Please try again."
      );
    }
  }, [successInRegistration, registerError, successInLogin, loginError]);

  // Toggle between login/signup
  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      try {
        await loginUser({
          email: signInData.email,
          password: signInData.password,
        }).unwrap();
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      // Signup validation
      if (signUpData.password !== signUpData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        await registerUser({
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password,
        }).unwrap();
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formVariants = {
    hidden: { opacity: 0, x: mode === "login" ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: mode === "login" ? 20 : -20,
      transition: { duration: 0.3 },
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md lg:max-w-lg"
        >
          <Card className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] shadow-2xl shadow-black/20 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
            <div className="relative">
              <CardHeader className="space-y-1 text-center px-6 sm:px-8 pt-8 sm:pt-10">
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center mb-6"
                >
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/20"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="w-7 h-7 text-blue-400" />
                  </motion.div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    {mode === "login" ? "Welcome back" : "Join us today"}
                  </CardTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardDescription className="text-gray-400 text-sm sm:text-base">
                    {mode === "login"
                      ? "Sign in to continue your journey"
                      : "Create your account and start exploring"}
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="px-6 sm:px-8">
                <AnimatePresence mode="wait">
                  <motion.form
                    key={mode}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Name Field (Signup only) */}
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <Label
                          htmlFor="name"
                          className="text-gray-200 text-sm font-medium"
                        >
                          Full Name
                        </Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            value={signUpData.name}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                name: e.target.value,
                              })
                            }
                            className="pl-12 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Email Field */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label
                        htmlFor="email"
                        className="text-gray-200 text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          value={
                            mode === "login"
                              ? signInData.email
                              : signUpData.email
                          }
                          onChange={(e) =>
                            mode === "login"
                              ? setSignInData({
                                  ...signInData,
                                  email: e.target.value,
                                })
                              : setSignUpData({
                                  ...signUpData,
                                  email: e.target.value,
                                })
                          }
                          className="pl-12 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
                        />
                      </div>
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label
                        htmlFor="password"
                        className="text-gray-200 text-sm font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          required
                          value={
                            mode === "login"
                              ? signInData.password
                              : signUpData.password
                          }
                          onChange={(e) =>
                            mode === "login"
                              ? setSignInData({
                                  ...signInData,
                                  password: e.target.value,
                                })
                              : setSignUpData({
                                  ...signUpData,
                                  password: e.target.value,
                                })
                          }
                          className="pl-12 pr-12 py-3 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
                        />
                        <motion.button
                          type="button"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Confirm Password (Signup only) */}
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <Label
                          htmlFor="confirmPassword"
                          className="text-gray-200 text-sm font-medium"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            required
                            value={signUpData.confirmPassword}
                            onChange={(e) =>
                              setSignUpData({
                                ...signUpData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="pl-12 pr-12 py-3 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
                          />
                          <motion.button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Remember Me (Login only) */}
                    {mode === "login" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500/20 focus:ring-2"
                          />
                          <Label
                            htmlFor="remember"
                            className="text-sm text-gray-400"
                          >
                            Remember me
                          </Label>
                        </div>
                        <motion.button
                          type="button"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          Forgot password?
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        disabled={
                          mode === "login" ? isLoggingIn : isRegistering
                        }
                        className={`w-full bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-800 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 border-0 ${
                          (mode === "login" ? isLoggingIn : isRegistering)
                            ? "opacity-70 cursor-not-allowed"
                            : "shadow-blue-500/25 hover:shadow-blue-500/40"
                        }`}
                      >
                        {(mode === "login" ? isLoggingIn : isRegistering) ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            {mode === "login"
                              ? "Authenticating..."
                              : "Registering User..."}
                          </div>
                        ) : mode === "login" ? (
                          "Sign in"
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                </AnimatePresence>
              </CardContent>

              <CardFooter className="px-6 sm:px-8 pb-8">
                <motion.div
                  variants={itemVariants}
                  className="text-center text-sm text-gray-400 w-full"
                >
                  {mode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <motion.button
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors ml-1"
                    onClick={toggleMode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </motion.button>
                </motion.div>
              </CardFooter>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import OtpInput from "@/components/auth/OtpInput";
import axiosInstance from "@/lib/axiosInstance";
import { useUserStore } from "@/lib/userStore";

// You can replace these with your own assets
const googleLogo = "https://chat-webapp-guptajee.s3.us-east-1.amazonaws.com/project_pic/Google_Favicon_Vector-removebg-preview.webp";
const facebookLogo = "https://chat-webapp-guptajee.s3.us-east-1.amazonaws.com/project_pic/Facebook_Logo_PNG-removebg-preview.webp";


interface LoginSignupProps {
  mode?: "login" | "signup";
  sideImage?: string;
}

export default function LoginSignup({
  mode = "login",
  sideImage,
}: LoginSignupProps) {
  const [step, setStep] = useState<"email" | "otp" | "complete-profile">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // For login
  const handleSendOtp = async () => {
    console.log("handleSendOtp called with email:", email);
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/check-email", { email });
      console.log("Check email response:", res.data);
      if (!res.data.exists) {
        toast.error("Email does not exist, please signup now.");
        setLoading(false);
        return;
      }
      const otpRes = await axiosInstance.post("/auth/send-otp", { email });
      console.log("Send OTP response:", otpRes.data);
      setStep("otp");
      toast.success("OTP sent to your email!");
    } catch (err) {
      console.error("Error in handleSendOtp:", err);
      toast.error("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  // For signup
  const handleSendOtpSignup = async () => {
    console.log("handleSendOtpSignup called with email:", email);
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/check-email", { email });
      console.log("Check email response:", res.data);
      if (res.data.exists) {
        toast.error("Email already exists, please sign in.");
        setLoading(false);
        return;
      }
      const otpRes = await axiosInstance.post("/auth/send-otp", { email });
      console.log("Send OTP response:", otpRes.data);
      setStep("otp");
      toast.success("OTP sent to your email!");
    } catch (err) {
      console.error("Error in handleSendOtpSignup:", err);
      toast.error("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  // OTP verification (both login/signup)
  const handleVerifyOtp = async (inputOtp: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { email, otp: inputOtp });
      if (!res.data.user.fullName) {
        setStep("complete-profile");
        return;
      }
      // Set auth state and redirect to dashboard
      const { setUser } = useUserStore.getState();
      const userRes = await axiosInstance.get("/users/me");
      setUser(userRes.data);
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Wrong/Invalid OTP");
    }
    setLoading(false);
  };

  const handleResendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("OTP resent!");
    }, 900);
  };

  // Handler for profile pic selection
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.startsWith("image/")) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    } else {
      setProfilePic(null);
      setProfilePicPreview(null);
      toast.error("Please select a valid image file.");
    }
  };

  // Handler for complete profile
  const handleCompleteProfile = async () => {
    if (!fullName.trim()) {
      toast.error("Please fill the full name.");
      return;
    }
    setProfileLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("fullName", fullName);
    if (profilePic) formData.append("profilePic", profilePic);
    try {
      const res = await axiosInstance.post("/auth/complete-profile", formData);
      const { setUser } = useUserStore.getState();
      const userRes = await axiosInstance.get("/users/me");
      setUser(userRes.data);
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Profile update failed");
    }
    setProfileLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-blue-100/30 to-white dark:from-primary/20 dark:via-blue-900/10 dark:to-neutral-900 px-2 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-4xl bg-white/90 dark:bg-blue-950/80 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden backdrop-blur-xl ring-1 ring-primary/10"
      >
        {/* Left Side Image */}
        <div className="flex flex-1 items-stretch justify-stretch bg-gradient-to-br from-primary/10 to-blue-100/30 dark:from-primary/20 dark:to-blue-900/20 relative min-h-[220px] md:min-h-0">
          <img
            src={sideImage}
            alt="LOLChat Illustration"
            className="object-cover w-full h-full"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
        </div>
        {/* Right Side Content */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <AnimatePresence mode="wait">
              {step === "email" ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col gap-4"
                >
                  <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-2 tracking-tight drop-shadow">
                    {mode === "login" ? "Login" : "Sign Up"} to <span className="text-blue-500">LOLChat</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 text-base font-medium">
                    {mode === "login"
                      ? "Welcome back! Please login to your LOLChat account."
                      : "Create your LOLChat account and join the fun!"}
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    disabled={loading}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-blue-100 dark:bg-blue-900 text-foreground focus:ring-2 focus:ring-primary outline-none transition text-base placeholder:text-primary shadow-sm"
                  />
                  <button
                    onClick={mode === "login" ? handleSendOtp : handleSendOtpSignup}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-primary transition text-base"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                  {/* Divider */}
                  <div className="relative my-4 w-full flex items-center">
                    <span className="absolute left-0 right-0 h-px bg-primary/20"></span>
                    <span className="relative bg-white dark:bg-blue-950/80 px-3 text-muted-foreground text-xs font-medium mx-auto">or continue with</span>
                  </div>
                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-6 mt-1">
                    <button
                      type="button"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-blue-950/40 border border-primary/10 shadow hover:bg-primary/10 transition cursor-pointer"
                    >
                      <img src={googleLogo} alt="Google" className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-blue-950/40 border border-primary/10 shadow hover:bg-primary/10 transition cursor-pointer"
                    >
                      <img src={facebookLogo} alt="Facebook" className="w-6 h-6 rounded-full object-cover" />
                    </button>
                  </div>
                </motion.div>
              ) : step === "otp" ? (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col gap-4"
                >
                  {/* Removed heading and subtext from OTP step */}
                  <OtpInput
                    email={email}
                    onVerify={handleVerifyOtp}
                    onResend={handleResendOtp}
                    loading={loading}
                    error={otpError ? "Wrong/Invalid OTP" : ""}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="complete-profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col gap-4"
                >
                  {/* Profile Pic Circular Selector */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-primary flex items-center justify-center cursor-pointer relative overflow-hidden"
                      onClick={() => document.getElementById("profilePicInput")?.click()}
                    >
                      {profilePicPreview ? (
                        <img
                          src={profilePicPreview}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User className="w-10 h-10 text-primary" />
                      )}
                      <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePicChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="text-primary text-sm font-medium hover:underline"
                      onClick={() => document.getElementById("profilePicInput")?.click()}
                    >
                      Set profilePic
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-blue-100 dark:bg-blue-900 text-foreground focus:ring-2 focus:ring-primary outline-none transition text-base placeholder:text-primary shadow-sm"
                  />
                  <button
                    onClick={handleCompleteProfile}
                    disabled={profileLoading}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-primary transition text-base"
                  >
                    {profileLoading ? "Completing..." : "Complete Profile"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
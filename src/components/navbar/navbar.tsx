"use client";
import { ModeToggle } from "@/components/public/themeToggle";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/lib/authStore";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import EditProfileModal from "@/components/modals/EditProfileModal";

export function NavbarDemo() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only fetch if not already loaded
    if (!user) {
      axiosInstance
        .get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => {});
    }
  }, [user, setUser]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div className="relative w-full">
      <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-md z-50">
        {/* Left: App Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="LOLChat Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-extrabold text-2xl text-primary tracking-tight">
            LOLChat
          </span>
        </div>
        {/* Right: ThemeToggle, Auth Buttons/Profile */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user && user.fullName ? (
            <button
              ref={profileButtonRef}
              className="rounded-full border-2 border-primary w-10 h-10 overflow-hidden focus:outline-none"
              onClick={() => setModalOpen((v) => !v)}
              title="Profile"
            >
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg font-semibold text-primary border border-primary bg-white hover:bg-primary hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg font-semibold text-white bg-primary hover:bg-blue-600 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Profile Dropdown Modal */}
      <AnimatePresence>
        {modalOpen && user && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute right-8 top-16 z-50"
            style={{ minWidth: 320 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-blue-600 py-4 px-0 flex flex-col gap-2">
              <div className="flex items-center gap-3 px-6 pb-3 border-b border-primary/10">
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <div className="font-bold text-lg text-primary">
                    {user.fullName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    @{user.username}
                  </div>
                </div>
              </div>
              <button
                className="flex items-center gap-2 px-6 py-3 text-base text-primary hover:bg-primary/10 transition font-medium"
                onClick={() => {
                  setModalOpen(false);
                  setEditModalOpen(true);
                }}
              >
                <Settings className="w-5 h-5" />
                Manage account
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 text-base text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
                onClick={async () => {
                  await axiosInstance.post("/auth/logout");
                  logout();
                  setModalOpen(false);
                  window.location.href = "/";
                }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Edit Profile Modal */}
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onProfileUpdate={setUser}
      />
    </div>
  );
}

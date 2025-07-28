"use client";
import { useState, useRef, useEffect } from "react";
import { User } from "@/lib/userStore";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { X, User as UserIcon, Upload, Trash2, Loader2 } from "lucide-react";

const isAvatarUrl = (url?: string) =>
  typeof url === "string" && url.startsWith("https://ui-avatars.com/api/");

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onProfileUpdate: (user: User) => void;
}

export default function EditProfileModal({
  open,
  onClose,
  user,
  onProfileUpdate,
}: EditProfileModalProps) {
  if (!open) return null;

  const [fullName, setFullName] = useState(user.fullName || "");
  const [username, setUsername] = useState(user.username || "");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string>(user.profilePic || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset fields to DB values every time modal opens
  useEffect(() => {
    if (open) {
      setFullName(user.fullName || "");
      setUsername(user.username || "");
      setProfilePicPreview(user.profilePic || "");
      setProfilePic(null);
    }
  }, [open, user]);

  // Prevent background scroll and fade background when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle profile pic upload
  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed (max 10MB).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB.");
      return;
    }
    setUploading(true);
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
    try {
      const formData = new FormData();
      formData.append("profilePic", file);
      formData.append("fullName", fullName);
      formData.append("username", username);
      const res = await axiosInstance.put("/users/editProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile picture updated!");
      onProfileUpdate(res.data.user);
      setProfilePic(null);
      setProfilePicPreview(res.data.user.profilePic);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to upload image.");
      setProfilePicPreview(user.profilePic || "");
    }
    setUploading(false);
  };

  // Handle profile pic remove
  const handleRemoveProfilePic = async () => {
    setRemoving(true);
    try {
      const res = await axiosInstance.put(
        "/users/editProfile",
        { removeProfilePic: true, fullName, username },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Profile picture removed!");
      onProfileUpdate(res.data.user);
      setProfilePic(null);
      setProfilePicPreview(res.data.user.profilePic);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to remove profile picture.");
    }
    setRemoving(false);
  };

  // Handle save (fullname/username)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.put(
        "/users/editProfile",
        { fullName, username },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Profile updated!");
      onProfileUpdate(res.data.user);
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Profile Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <button
            className="absolute top-4 right-4 text-white text-3xl z-50"
            onClick={() => setShowImageModal(false)}
            aria-label="Close"
          >
            <X />
          </button>
          <div className="flex items-center justify-center w-full h-full">
            <div
              className="rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white"
              style={{
                width: "min(90vw, 420px)",
                height: "min(90vw, 420px)",
                maxWidth: "90vw",
                maxHeight: "80vh",
                aspectRatio: "1/1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={profilePicPreview || user.profilePic || ""}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl w-[90vw] max-w-md relative">
        <button
          className="absolute top-3 right-3 text-xl text-primary"
          onClick={onClose}
        >
          <X />
        </button>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            {/* Profile Pic + Upload/Remove + Email (HORIZONTAL) */}
            <div className="flex flex-row items-center gap-4 w-full">
              {/* Profile Pic at left */}
              <div
                className="relative w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/20 border-2 border-primary flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => setShowImageModal(true)}
                title="View profile picture"
              >
                {profilePicPreview ? (
                  <img
                    src={profilePicPreview}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full bg-white"
                  />
                ) : (
                  <UserIcon className="w-8 h-8 text-primary" />
                )}
              </div>
              {/* Upload/Remove at right */}
              <div className="flex flex-col items-start flex-1 -mb-7 ">
                <div className="flex flex-row gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-1 rounded-lg bg-primary text-white font-semibold hover:bg-blue-600 transition disabled:opacity-70"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading || removing}
                  >
                    {uploading && (
                      <Loader2 className="animate-spin w-4 h-4 mr-1" />
                    )}
                    {uploading ? "Uploading..." : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePicChange}
                    />
                  </button>
                  {!isAvatarUrl(profilePicPreview) && (
                    <button
                      type="button"
                      className="flex items-center gap-2 px-2 py-1 rounded-lg bg-transparent text-red-500 font-semibold hover:underline transition disabled:opacity-70"
                      onClick={handleRemoveProfilePic}
                      disabled={removing || uploading}
                    >
                      {removing && (
                        <Loader2 className="animate-spin w-4 h-4 mr-1" />
                      )}
                      {removing ? "Removing..." : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </>
                      )}
                    </button>
                  )}
                </div>
                {/* Email just below the upload/remove buttons */}
                <span className="text-base font-semibold text-muted-foreground break-all mt-2">{user.email}</span>
              </div>
            </div>
            {/* End left column */}
            {/* Right side empty for spacing on desktop */}
            <div className="hidden sm:block flex-1" />
          </div>
          {/* Full Name & Username */}
          <div className="flex gap-3 mt-5">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs font-semibold text-primary">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-blue-100 dark:bg-blue-900 text-foreground outline-none transition text-base placeholder:text-primary shadow-sm"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs font-semibold text-primary">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-blue-100 dark:bg-blue-900 text-foreground outline-none transition text-base placeholder:text-primary shadow-sm"
              />
            </div>
          </div>
          {/* Save/Cancel */}
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg font-semibold text-primary border border-primary bg-white hover:bg-primary hover:text-white transition"
              onClick={onClose}
              disabled={loading || uploading || removing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading || removing}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-primary hover:bg-blue-600 transition flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin w-4 h-4" />}
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
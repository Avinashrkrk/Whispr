import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-[#111827] pt-20 pb-12">
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - User Profile Form */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="text-indigo-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Your Profile</h1>
              <p className="text-gray-400 text-sm">Manage your personal information</p>
            </div>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.jpg"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-indigo-500/20"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-indigo-500 hover:bg-indigo-600 
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Information */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <div className="px-4 py-3 bg-[#1a2030] rounded-md border border-gray-700 text-white">
                {authUser?.fullName}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="px-4 py-3 bg-[#1a2030] rounded-md border border-gray-700 text-white">
                {authUser?.email}
              </div>
            </div>
          </div>
          
          {/* Account Information */}
          <div className="space-y-5 bg-[#1a2030] rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 pb-2 border-b border-gray-700">
              <Shield className="w-5 h-5 text-indigo-500" />
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>Member Since</span>
                </div>
                <span className="text-white">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t border-gray-700">
                <div className="flex items-center gap-2 text-gray-300">
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <span>Account Status</span>
                </div>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Decorative Section */}
        <div className="hidden lg:block relative rounded-lg overflow-hidden bg-indigo-600">
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
            <div className="bg-white/10 rounded-full p-4 mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center">Welcome to Whispr</h2>
            <p className="text-lg text-center mb-8">
              Manage your profile and stay connected with your conversations
            </p>
            
            <div className="bg-indigo-700/40 p-6 rounded-lg max-w-md">
              <p className="italic text-white/90 mb-4">
                "Whispr has transformed how our team communicates. It's become essential to our daily workflow."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-white/70">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Bell, Menu } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/90 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-all group">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-none">Whispr</h1>
                <span className="text-xs text-base-content/60">Stay connected</span>
              </div>
            </Link>
            
            {/* Optional: Desktop Navigation Links */}
            {/* <nav className="hidden md:flex items-center gap-4">
              <Link to="/explore" className="text-base-content/70 hover:text-primary transition-colors">
                Explore
              </Link>
              <Link to="/messages" className="text-base-content/70 hover:text-primary transition-colors">
                Messages
              </Link>
              <Link to="/community" className="text-base-content/70 hover:text-primary transition-colors">
                Community
              </Link>
            </nav> */}
          </div>
          
          {/* Right Side: Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button - Visible on small screens */}
            <button className="btn btn-sm btn-ghost md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Notifications */}
            {authUser && (
              <button className="btn btn-sm btn-ghost btn-circle relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error"></span>
              </button>
            )}
            
            {/* Settings Button */}
            <Link
              to="/settings"
              className="btn btn-sm btn-ghost hover:bg-base-200 gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            
            {/* User Profile & Logout */}
            {authUser && (
              <>
                <div className="border-l border-base-300 h-8 mx-1 hidden sm:block"></div>
                
                <Link to="/profile" className="btn btn-sm btn-ghost hover:bg-base-200 gap-2">
                  <div className="avatar">
                    <div className="w-6 h-6 rounded-full bg-primary/20">
                      <span className="text-xs text-primary font-medium">
                        {authUser.fullName?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </div>
                  <span className="hidden sm:inline font-medium">{authUser.fullName?.split(" ")[0] || "Profile"}</span>
                </Link>
                
                <button 
                  className="btn btn-sm btn-ghost hover:bg-error/10 hover:text-error gap-2 transition-all"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
            
            {/* Login/Register for non-authenticated users */}
            {!authUser && (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-sm btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
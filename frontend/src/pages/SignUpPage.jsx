import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import avatar1 from '../api/placeholder/img-2.webp'
import avatar2 from '../api/placeholder/img-3.png'
import avatar3 from '../api/placeholder/img-3.jpeg'
import {toast} from "react-hot-toast"

function SignUpPage(){
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    
        return true;
      }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const success = validateForm();
    
        if (success === true) signup(formData);
    }

    return(
        <div className="min-h-screen grid lg:grid-cols-2">
  {/* Left side - Form */}
  <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-b from-base-100 to-base-200">
    <div className="w-full max-w-md space-y-8">
      {/* Logo and Header */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-3 group">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-sm">
            <MessageSquare className="size-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mt-2 text-primary-content">Create Account</h1>
          <p className="text-base-content/70 max-w-xs">Join Whispr today and connect with your community</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-5 text-primary/60" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-primary/60" />
            </div>
            <input
              type="email"
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-primary/60" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
            <span className="label-text text-sm">
              I agree to the <a href="#" className="link link-primary">Terms of Service</a> and <a href="#" className="link link-primary">Privacy Policy</a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="btn btn-primary w-full py-3 h-12 mt-2 shadow-md hover:shadow-lg transition-all" 
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <>
              <Loader2 className="size-5 animate-spin mr-2" />
              Creating your account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-base-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-base-100 px-4 text-xs text-base-content/60">OR CONTINUE WITH</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="btn btn-outline flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="size-5">
            <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.09.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.917.678 1.852 0 1.335-.012 2.415-.012 2.741 0 .267.18.577.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          GitHub
        </button>
        <button className="btn btn-outline flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="size-5">
            <path fill1="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path fill1="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path fill1="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path fill1="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
      </div>

      {/* Sign In Link */}
      <div className="text-center mt-6">
        <p className="text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>

  {/* Right side - Image/Branding */}
  <div className="hidden lg:flex flex-col items-center justify-center bg-primary text-primary-content p-12 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
    
    <div className="relative z-10 max-w-md text-center space-y-6">
      <div className="size-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <MessageSquare className="size-10" />
      </div>
      <h2 className="text-4xl font-bold">Welcome to Whispr</h2>
      <p className="text-xl opacity-90">Connect with friends, share moments, and stay in touch with your loved ones.</p>
      
      <div className="pt-8">
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatar1} alt="User" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatar2} alt="User" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatar3} alt="User" />
            </div>
          </div>
          <div className="avatar placeholder">
            <div className="w-12 h-12 rounded-full bg-white/20 text-primary-content">
              <span>+99</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-white/80">Join thousands of users already on Whispr</p>
      </div>
    </div>
  </div>
</div>
    )
}

export default SignUpPage
